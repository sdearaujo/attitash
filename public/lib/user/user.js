// ## User Objects
function User(username, password) {
  this.username = username;
  this.password = password;
}

var userdb = [
  new User('tim',   'mit'),
  new User('hazel', 'lezah'),
  new User('caleb', 'belac')
];

exports.lookup = function(username, password, cb) {
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
