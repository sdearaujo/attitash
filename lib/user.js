var userdb = require('../data/user.db.js');

var _uid = 0;

// ## User Object
// @param {string} username Username
// @param {string} password Password
// @param {string} fname First Name
// @param {string} lname Last Name
// @param {string} email E-Mail address
function User(username, password, fname, lname, email) {
  this.username = username;
  this.password = password;
  this.uid      = ++_uid;
  this.fname    = fname;
  this.lname    = lname;
  this.email    = email;
};

// ## Wrapper for constructor Function
exports.createUser = function(username, password, fname, lname, email){
  return new User(username, password, fname, lname, email);
}