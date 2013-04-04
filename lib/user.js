var userdb = require('../data/user.db.js');

var _uid = 0;

var followers = ["anthony"];

// ## User Objects
function User(username, password, fname, lname, email) {
  this.username = username;
  this.password = password;
  this.uid      = ++_uid;
  this.fname    = fname;
  this.lname    = lname;
  this.email    = email;
  this.followers = followers;
};

exports.createUser = function(username, password, fname, lname, email){
  return new User(username, password, fname, lname, email);
};

exports.getFollowers = function(cb){
  cb(undefined, followers);
};

exports.addFollower = function(username, cb){
	followers.push(username);
	cb(undefined, username);
};
