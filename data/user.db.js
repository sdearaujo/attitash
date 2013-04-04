// Modules required to get the function to create users 
var user = require('../lib/user.js');

// # In Memory User database
var userdb = [
  user.createUser('anthony', 'anthony', 'Anthony', 'Battaglia', 'anthony@battaglia.com'),
  user.createUser('brian', 'brian', 'Brian', 'Dragunas', 'brian@dragunas.com'),
  user.createUser('john', 'john', 'John', 'Coschigano', 'john@coschigano.com'),
  user.createUser('sam', 'sam', 'Samuel', 'Nascimento', 'samuel@nascimento.com')
];

// ## insert
// ### Add user to the database
// @param {object} user User to be stored (need to check for existing keys!)
exports.insert = function(user, callback){
  userdb.push(user);
  callback(undefined, user);
};

// ## authenticate
// ### Authenticate that the user exists in the database via username and password
// @param {string} username Username
// @param {string} passwrod Password
exports.authenticate = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};

// ## getUser
// ### Get Specific User by username
// @param {string} username The user to get
exports.getUser = function(username, cb){
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      cb(undefined, u);
      return;
    }
  }
  cb('user not found');
};

exports.getFollowersForUsername = function(username, cb){
  for(var i = 0; i < userdb.length; i++){
    var u = userdb[i];
    if(u.username === username){
      cb(undefined, u.followers);
     }
  }
  cb('error getting followers');
};

exports.getFollowingForUsername = function(username, cb){
  for(var i = 0; i < userdb.length; i++){
    var u = userdb[i];
    if(u.username === username){
      cb(undefined, u.following);
     }
  }
  cb('error getting following');
};

exports.getPotentialFollowers = function(username, cb){
  var flwrs;
  var who_to_follow = [];
  for(var i = 0; i < userdb.length; i++){
    var u = userdb[i];
    if(u.username === username){
      flwrs = u.following;
    }
  }
  var following = false;
  for(var i = 0; i < userdb.length; i++){
    if(flwrs.indexOf(userdb[i].username) === -1){
      if(userdb[i].username !== username){  
        who_to_follow.push(userdb[i]);
      }
    }
  }
  cb(undefined, who_to_follow);
}

exports.addFollowerForUser = function(follower, followee, cb){
  var fr, fe;
  for(var i = 0; i < userdb.length; i++){
    var u = userdb[i];
    if(u.username === follower){
      fr = u;
    }
    if(u.username === followee){
      fe = u;
    }
  }
  fr.following.push(fe.username);
  fe.followers.push(fr.username);
  cb(undefined);
}

