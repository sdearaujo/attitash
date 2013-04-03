var _uid = 0;

// ## User Objects
function User(username, password, fname, lname, email) {
  this.username = username;
  this.password = password;
  this.uid      = ++_uid;
  this.fname    = fname;
  this.lname    = lname;
  this.email    = email;
  this.following = [];
  this.followers = [];
  this.tashs = [];
};

var userdb = [
  new User('brian', 'brian', 'Brian', 'Dragunas', 'brian@dragunas.com'),
  new User('anthony', 'anthony', 'Anthony', 'Battaglia', 'anthony@battaglia.com'),
  new User('jon', 'jon', 'John', 'Coschigano', 'john@coschigano.com')
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

exports.addUser = function(username, password, fname, lname, email, callback){
  var user = new User(username, password, fname, lname, email)
  userdb.push(user);
  callback(undefined, user);
};

exports.follow = function(follower, followee, callback){
  for(var i = 0; i < userdb.length; i++){
    var user = userdb[i];
    if(user.username === follower){
      user.following.push(followee);
    }
  }
  for(var i = 0; i < userdb.length; i++){
    var user = userdb[i];
    if(user.username === followee){
      user.followers.push(follower);
    }
  }
  console.log(userdb);
  callback(follower + ' is now following ' + followee);
};

exports.getAllUsers = function(){
  return userdb;
}