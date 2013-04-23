// Modules required to access the database
var users = require("../lib/users.js");
var tashs = require("../lib/tashs.js");
var following = require("../lib/following.js");

// who's logged on?
var online = {};

// ## login
// Provides a user login view.
exports.login = function(req, res){
  var user = req.session.user;
  // redirect if logged in
  if(user !== undefined){
    res.redirect('/home');
  }
  else{
    // Grab any messages being sent to use from redirect.
    var authmessage = req.flash('auth') || '';
    res.render('login', { title   : 'User Login',
                          message : authmessage });
  }
};

// ## auth
// Performs **basic** user authentication.
exports.auth = function(req, res){
  // Pull the values from the form
  var username = req.body.username;
  var password = req.body.password;

  // Perform the user lookup.
  users.getUserByUsername(username, function(err, user){
    if(err){
      req.flash('auth', 'error getting user!');
      res.redirect('/login');
    }
    if(user === undefined){
      // query returned nothing!
      req.flash('auth', 'cannot find user!');
      res.redirect('/login');
    }
    else{
      if(user.pwd == password){
        req.session.user = user;
        online[user.uname] = user;
        res.redirect('/home');
      }
      else{
        // found user but something went wrong. wrong password
        req.flash('auth', 'wrong passowrd!');
        res.redirect('/login');
      }
    }
  });
};

// ## logout
// Deletes user info & session - then redirects to login.
exports.logout = function(req, res) {
  
  //get the user from the session
  var user = req.session.user;
  //if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }

  //remove the user from the the array of online users
  if (online[user.uname] !== undefined) {
    delete online[user.uname];
  }

  //delete the user from the session
  delete req.session.user;
  //redirect to login page
  res.redirect('/login');
};

// ## register
// Route for register page
exports.register = function(req, res){
  var authmessage = req.flash('auth') || '';
  req.flash('auth', '');
  //get the user from the session
  var user = req.session.user;
  if (user !== undefined) {
    res.redirect('/home');
  }
  else{
    res.render('register', {  title: 'Attitash - Register', message: authmessage });
  }
};

// ## addUser
// Provides a route to create a new user.
exports.addUser = function(req, res){
  //values obtained from the form
  var username = req.body.username;
  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  
  // check if the values are not undefined
  if(username && password && fname && lname && email){
  // put user in the database
    users.addUser(username, password, fname, lname, email, function(err, user){
      if(err){
        // could be another error, right now assume username is taken is reason insert failed
        req.flash('auth', 'Username already exists!');
        res.redirect('/register');
      }
      else{
        // log the user in and send them to the home screen
        users.getUserByUsername(username, function(err, user){
          if(err){
            res.send("error getting user! " + err);
          }
          if(user === undefined){
            res.send("cannot find user!");
          }
          else{
            req.session.user = user;
            online[user.uname] = user;
            res.redirect('/home');
          }
        });   
      }
    });
  }
};

// ##follow
// handler for following another user
exports.follow = function(req, res){
  // grab the values from the query string
  var follower = req.query.follower;
  var followee = req.query.followee;

  // put new relation in the database
  following.addFollowByUsername(follower, followee, function(err){
    if(err){
      res.send("error following " + followee);
    }
    else{
      res.redirect('/home');
    }
  });
};

// ## tash
// Create a new tash.
exports.tash = function(req, res){
  var user = req.session.user;
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else{
    var uname = user.uname;
    var content = req.body.content;

    tashs.addTash(uname, content, function(err){
      if(err){
        res.send("error adding tash!");
      }
      else{
        tashs.getLastTash(uname, function(err, tash){
          if(err){
            res.send("error getting last tash!");
          }
          else{
            // send json response data back to client to handle it in ajax success function
            res.json(tash);
          }
        });
      }
    });
  }
};

exports.home = function(req, res){

  var user = req.session.user;

  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else{
    // get the news feed
    tashs.getNewsFeed(user.uname, function(err, _tashs){
      if(err){
        res.send("error getting tashs! " + err);
      }
      else{
        // get who to follow
        following.getWhoToFollowByUsername(user.uname, function(err, who_to_follow){
          if(err){
            res.send("error getting who to follow! " + err);
          }
          else{
            // get number of tashs by this user
            tashs.countTashsByUsername(user.uname, function(err, numTashes){
              if(err){
                res.send("error counting tashs! " + err);
              }
              else{
                // get number of followers for this user
                following.countFollowersByUsername(user.uname, function(err, numFollowers){
                  if(err){res.send("error counting followers! " + err);}
                  else{
                    // get number of users this user is following
                    following.countFollowingByUsername(user.uname, function(err, numFollowing){
                      if(err){res.send("error counting following! " + err);}
                      else{
                        // finally...render it all
                        for(var i = 0; i < _tashs.length; i++){
                          _tashs[i].content = formatTash(_tashs[i].content);
                        }
                        res.render('home', { 
                          title: 'Attitash - Home',
                          message: '',
                          notification: '',
                          username: user.uname,
                          online : online,
                          who_to_follow: who_to_follow,
                          tashs: _tashs,
                          numtashes: numTashes.tash_count,
                          numfollowing: numFollowing.following_count,
                          numfollowers: numFollowers.follower_count,
                          trends: ['attitash', 'cs326', 'balsamiq', 'betterthantwitter', 'tash']
                        });
                      }
                    });
                  }
                });             
              }
            });
          }
        });
      }
    });
  }
};

exports.me = function(req, res){

  var user = req.session.user;

  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else{
    // get the news feed
    tashs.getTashsByUsername(user.uname, function(err, _tashs){
      if(err){
        res.send("error getting tashs! " + err);
      }
      else{
        // get who to follow
        following.getWhoToFollowByUsername(user.uname, function(err, who_to_follow){
          if(err){
            res.send("error getting who to follow! " + err);
          }
          else{
            // get followers of this user
            following.getFollowersByUsername(user.uname, function(err, followers){
              if(err){res.send("error getting followers! " + err);}
              else{
                // get users this user is following
                following.getFollowingByUsername(user.uname, function(err, following){
                  if(err){res.send("error getting following! " + err);}
                  else{
                    // finally...render it all
                    res.render('me', { 
                      title: 'Attitash - Me',
                      message: '',
                      notification: '',
                      username: user.uname,
                      online : online,
                      who_to_follow: who_to_follow,
                      tashs: _tashs,
                      following: following,
                      followers: followers,
                      trends: ['attitash', 'cs326', 'balsamiq', 'betterthantwitter', 'tash']
                    });
                  }
                });
              }
            });             
          }
        });
      }
    });
  }
};

// ## discover
// Route for discover page
exports.discover = function(req, res) {
  //get the user from the session
  var user = req.session.user;
  //if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
    following.getWhoToFollowByUsername(user.uname, function(err, who_to_follow){
      if(err){
        res.send("error getting who to follow!");
      }
      else{
        res.render('discover', { 
          title: 'Attitash - Discover',
          username: user.uname,
          users : online,
          tashs: [],
          who_to_follow: who_to_follow,
          trends: ['attitash', 'cs326', 'balsamiq', 'betterthantwitter', 'tash']
        });
      }
    });
  }
};

// ## connect
// Route for connect page
exports.connect = function(req, res) {
  //get the user from the session
  var user = req.session.user;
  //if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
    following.getWhoToFollowByUsername(user.uname, function(err, who_to_follow){
      if(err){
        res.send("error getting who to follow!");
      }
      else{
        tashs.getTashsByFollowing(user.uname, function(err, _tashs){
          if(err){
            res.send("error getting tashs by following!");
          }
          else{
            res.render('connect', { 
              title: 'Attitash - Connect',
              username: user.uname,
              users : online,
              tashs: _tashs,
              who_to_follow: who_to_follow,
              trends: ['attitash', 'cs326', 'balsamiq', 'betterthantwitter', 'tash']
            });
          }
        });
      }
    });
  }
};

// ## settings
// Route for settings page
exports.settings = function(req, res){
  //get the user from the session
  var user = req.session.user;
  //if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
    res.render('settings', {
      title: 'Attitash - Settings',
      user: user.fname,
      username: user.username
    })
  }
};

function formatTash(tash){
        var finalContent = "";
        array = tash.split(" ");
        for(var i = 0; i<array.length; i++){
                if(array[i].charAt(0) == '#'){
                                finalContent = finalContent.concat("<a href=\"");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("\">");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("</a>");
                }
                else if(array[i].charAt(0) == '@'){
                                finalContent = finalContent.concat("<a href=\"");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("\">");
                                finalContent = finalContent.concat(array[i]);
                                finalContent = finalContent.concat("</a>");
                }
                else{
                        finalContent = finalContent.concat(array[i]);
                }
                finalContent = finalContent.concat(" ");
        }
        return finalContent;
}