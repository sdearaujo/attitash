// Modules required to get the user data stored 
var userdb = require('../data/user.db.js');

// variable to represent the increment of user ID in the database
var _uid = 0;

// ## User Objects

function User(username, password, fname, lname, email) {
  this.username = username;
  this.password = password;
  this.uid      = ++_uid;
  this.fname    = fname;
  this.lname    = lname;
  this.email    = email;
  this.followers = ['anthony'];
};

// ## createUser()
// ### Wrapper for constructor Function
exports.createUser = function(username, password, fname, lname, email){
  return new User(username, password, fname, lname, email);
};

exports.addFollower = function(username, cb){
	followers.push(username);
	cb(undefined, username);
};
