var sqlite3 = require('sqlite3');

var following = require('./following.js');

// Connect to the database:
var db = new sqlite3.Database('./data/attitash.db');

exports.addUser = function(username, pwd, fname, lname, email, callback){
    db.run('insert into Users values (?, ?, ?, ?, ?)',
        username, pwd, fname, lname, email,
        // every user follows themselves, makes building the news feed either
        // must be careful about queries on the Following relation
        following.addFollowByUsername(username, username, callback));
};



exports.getUserByUsername = function(uname, callback){
    db.get('select * from Users u where u.uname=?',
        uname,
        callback);
};

exports.updatePassword = function(uname, newpwd, callback){
	db.run('update Users set pwd=? where uname=?',
		newpwd, uname,
		callback
	);
}
