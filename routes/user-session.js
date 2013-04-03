var userdb = require('../data/user.db.js');
var tashsdb = require('../data/tashs.db.js');
var trendsdb = require('../data/trends.db.js');
var user = require('../lib/user.js');
var tash = require('../lib/tash.js');
var trend = require('../lib/trend.js');

// A logged in "database":
var online = {};

var notification;
// # User Server-Side Routes

// ## login
// Provides a user login view.
exports.login = function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  // TDR: If the user is already logged in - we redirect to the
  // home application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/home');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login', { title   : 'User Login',
                          message : authmessage });
  }
};

// ## auth
// Performs **basic** user authentication.
exports.auth = function(req, res) {
  // TDR: redirect if logged in:
  var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/home');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    userdb.authenticate(username, password, function(error, user) {
      if (error) {
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        req.flash('auth', error);
        res.redirect('/login');
      }
      else {
        req.session.user = user;
        // Store the user in our in memory database.
        online[user.uid] = user;
        // Redirect to home.
        res.redirect('/home');
      }
    });
  }
};

exports.addUser = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  if(username && password && fname && lname && email){
    var u = user.createUser(username, password, fname, lname, email);
    userdb.insert(u, function(error, user){
      if(error){
        req.flash('auth', error)
        res.redirect('/register');
      }
      else{
        req.session.user = user;
        online[user.uid] = user;
        res.redirect('/login');  
      }
    });
  }
};

exports.tash = function(req, res){
  var user = req.session.user;
  tashsdb.insert(tash.createTash(user.username, req.body.tash_text), function(error, tash){
    if(error){
      console.log(error);
    }
    else{
      res.redirect('/home');
    }
  });
}

// ## logout
// Deletes user info & session - then redirects to login.
exports.logout = function(req, res) {
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
    return;
  }

  if (online[user.uid] !== undefined) {
    delete online[user.uid];
  }

  delete req.session.user;
  res.redirect('/login');
};

// ## home
// The home user view.
exports.home = function(req, res) {
  // TDR: added session support
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
    var trends = [], tashs = [];
    trendsdb.getTrends(function(error, ts){
      if(error){}
      else{
        trends = ts;
      }
    });
    tashsdb.getTashsByUsername(user.username, function(error, ts){
      if(error){}
      else{
        tashs = ts;
      }
    });
    res.render('home', { 
    title: 'Attitash - Home',
    message: '',
    notification: '',
    username: user.username,
    users : online,
    who_to_follow: [],
    tashs: tashs,
    trends: trends
  });}
};

exports.online = function(req, res) {
  res.render('online', { title : 'Users Online',
                         users : online });
};

//Route for Register page
exports.register = function(req, res){
  res.render('register', {  title: 'Attitash - Register' });
};

exports.me = function(req, res) {
  // TDR: added session support
  var user = req.session.user;
  console.log("user: " + user.username);
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
    tashsdb.getTashsByUsername(user.username, function(error, tashs){
      if(error){

      }
      else{
        console.log("tashs: " + tashs);
        res.render('me', { 
          title: 'Attitash - Home',
          message: 'Login Successful!',
          username: user.username,
          users : online,
          password: user.password,
          // mock tash values.<br>
          // <b>img_src:</b> location of image, to be placed in "img src="img_src value"<br>
          // <b>name:</b> account name<br>
          // <b>username:</b> account handle<br>
          // <b>tash_text:</b> text content of the mock tash
          tashs: tashs,
          who_to_follow: [],
          trends: ["attitash", "cs326", "jingleheimer", "roflmao", "bootstrap", "betterthantwitter", "tash"]
        });
      }
    });
  }
};

exports.discover = function(req, res) {
  // TDR: added session support
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
 res.render('discover', { 
    title: 'Attitash - Home',
    message: 'Login Successful!',
    username: user.username,
    users : online,
    password: user.password,
    // mock tash values.<br>
    // <b>img_src:</b> location of image, to be placed in "img src="img_src value"<br>
    // <b>name:</b> account name<br>
    // <b>username:</b> account handle<br>
    // <b>tash_text:</b> text content of the mock tash
    tashs: [],
    who_to_follow: [],
    trends: ["attitash", "cs326", "jingleheimer", "roflmao", "bootstrap", "betterthantwitter", "tash"]
  });}
};

exports.connect = function(req, res) {
  // TDR: added session support
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
 res.render('connect', { 
    title: 'Attitash - Home',
    message: 'Login Successful!',
    username: user.username,
    users : online,
    password: user.password,
    // mock tash values.<br>
    // <b>img_src:</b> location of image, to be placed in "img src="img_src value"<br>
    // <b>name:</b> account name<br>
    // <b>username:</b> account handle<br>
    // <b>tash_text:</b> text content of the mock tash
    tashs: [],
    who_to_follow: [],
    trends: ["attitash", "cs326", "jingleheimer", "roflmao", "bootstrap", "betterthantwitter", "tash"]
  });}
};


//Route for Settings page
exports.settings = function(req, res){
    res.render('settings', {
      title: 'Attitash',
      user: 'AttitashDev',
      username: 'AttitashDev'
    })
};

