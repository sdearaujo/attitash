// Packages required to get the data stored in the server 
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
  //get the user from the session
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
	// create a new user object
    var u = user.createUser(username, password, fname, lname, email);
	// insert the user object in the database
    userdb.insert(u, function(error, user){
      if(error){
	  // if some error occurred, show the error to the user and redirect to the register page
        req.flash('auth', error)
        res.redirect('/register');
      }
      else{
	  // if the user was inserted in the database correctly, put the user in the session and in the array of online users and redirect to the login page
        req.session.user = user;
        online[user.uid] = user;
        res.redirect('/login');  
      }
    });
  }
};

// ## tash
// Create a new tash.
exports.tash = function(req, res){
	
  //get the user from the session
var user = req.session.user;
  //insert the tash in the database
  tashsdb.insert(tash.createTash(user.username, req.body.tash_text), function(error, tash){
    if(error){}
    else{
	//if everything worked, redirect to the home page
      res.redirect('/home');
    }
  });
}

// ## logout
// Deletes user info & session - then redirects to login.
exports.logout = function(req, res) {
	
  //get the user from the session
var user = req.session.user;
  //if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
    return;
  }

  //remove the user from the the array of online users
  if (online[user.uid] !== undefined) {
    delete online[user.uid];
  }

  //delete the user from the session
  delete req.session.user;
  //redirect to login page
  res.redirect('/login');
};

// ## home
// Route for home page
exports.home = function(req, res) {
  
  //get the user from the session
  var user = req.session.user;
  //if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
  // create variable to keep the trends and tashs.
    var trends = [], tashs = [];
	// get the trends from the database
    trendsdb.getTrends(function(error, ts){
      if(error){}
      else{
        trends = ts;
      }
    });
	// get the tashs for this user from the database
    tashsdb.getTashsByUsername(user.username, function(error, ts){
      if(error){}
      else{
        tashs = ts;
      }
    });
	// call the home view with the following parameters:
	// <b>title:</b> Attitash - Home
    // <b>message:</b> empty
    // <b>notification:</b> empty
    // <b>username:</b> username from the session
    // <b>users:</b> array of online users
    // <b>who_to_follow:</b> empty array
    // <b>tashs:</b> tashs for this user from the database
    // <b>numtashes:</b> quantity of tashs
    // <b>trends:</b> trends from the database
    res.render('home', { 
    title: 'Attitash - Home',
    message: '',
    notification: '',
    username: user.username,
    users : online,
    who_to_follow: [],
    tashs: tashs,
    numtashes: tashs.length,
    trends: trends
  });}
};

exports.online = function(req, res) {
  res.render('online', { title : 'Users Online',
                         users : online });
};

// ## register
// Route for register page
exports.register = function(req, res){
	// call the register view with the following parameters:
	// <b>title:</b> Attitash - Register
  res.render('register', {  title: 'Attitash - Register' });
};

// ## me
// Route for me page
exports.me = function(req, res) {
  //get the user from the session
var user = req.session.user;
	//if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
  // get the tashs for this user from the database
    tashsdb.getTashsByUsername(user.username, function(error, tashs){
      if(error){}
      else{
	  // call the me view with the following parameters:
	// <b>title:</b> Attitash - Home
    // <b>message:</b> Login Successful!
    // <b>username:</b> username from this user
    // <b>users:</b> array of online users
    // <b>password:</b> password for this user
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
          numtashes: tashs.length,
          who_to_follow: [],
          trends: ["attitash", "cs326", "jingleheimer", "roflmao", "bootstrap", "betterthantwitter", "tash"]
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
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
   // call the discover view with the following parameters:
   // <b>title:</b> Attitash - Home
    // <b>message:</b> Login Successful!
    // <b>username:</b> username from this user
    // <b>users:</b> array of online users
    // <b>password:</b> password for this user
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

// ## connect
// Route for connect page
exports.connect = function(req, res) {
  //get the user from the session
var user = req.session.user;
//if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
  // call the connect view with the following parameters:
   // <b>title:</b> Attitash - Home
    // <b>message:</b> Login Successful!
    // <b>username:</b> username from this user
    // <b>users:</b> array of online users
    // <b>password:</b> password for this user
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


// ## settings
// Route for settings page
exports.settings = function(req, res){
//get the user from the session
var user = req.session.user;
//if the user is not logged, show the message "Not logged in!" and redirect to the login page
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
  }
  else {
  // call the settings view with the following parameters:
   // <b>title:</b> Attitash
    // <b>user:</b> AttitashDev
    // <b>username:</b> AttitashDev
    
    res.render('settings', {
      title: 'Attitash',
      user: 'AttitashDev',
      username: 'AttitashDev'
    })
  }

};

