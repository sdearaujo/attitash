var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/attitash.db');

exports.addUser = function(username, pwd, fname, lname, email, callback){
    db.run('insert into Users values (?, ?, ?, ?, ?)',
        username, pwd, fname, lname, email,
        callback);
};

exports.getUserByUsername = function(uname, callback){
    db.get('select * from Users u where u.uname=?',
        uname,
        callback);
};
