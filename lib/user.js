var userdb = require('../data/user.db.js');

var _uid = 0;

// ## User Objects
function User(username, password, fname, lname, email) {
  this.username = username;
  this.password = password;
  this.uid      = ++_uid;
  this.fname    = fname;
  this.lname    = lname;
  this.email    = email;
};

exports.createUser = function(username, password, fname, lname, email){
  return new User(username, password, fname, lname, email);
}