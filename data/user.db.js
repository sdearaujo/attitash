var user = require('../lib/user.js');

var _uid = 0;

var userdb = [
  user.createUser('anthony', 'anthony', 'Anthony', 'Battaglia', 'anthony@battaglia.com'),
  user.createUser('brian', 'brian', 'Brian', 'Dragunas', 'brian@dragunas.com'),
  user.createUser('john', 'john', 'John', 'Coschigano', 'john@coschigano.com'),
  user.createUser('sam', 'sam', 'Samuel', 'Nascimento', 'samuel@nascimento.com')
];

exports.insert = function(user, callback){
  userdb.push(user);
  callback(undefined, user);
};

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
}