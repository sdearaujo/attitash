// ## User Objects
function User(username, password, uid) {
  this.username = username;
  this.password = password;
  this.uid      = uid;
}

var userdb = [
  new User('brian', 'brian', 1),
  new User('anthony', 'anthony', 2),
  new User('jon', 'jon', 3)
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
