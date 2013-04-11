var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/attitash.db');

exports.addTash = function(username, content, date, callback){
	db.run('insert into Tashs values (?, ?, ?)',
		[username, content, date],
		callback);
};

exports.getTashsByUsername = function(uname, callback){
	db.all('select u.fname, u.lname, u.uname, t.content, t.tdate from Users u, Tashs t where t.uname=? and t.uname=u.uname',
		uname,
		callback);
};

exports.countTashsByUsername = function(uname, callback){
	db.get('select count(*) as tash_count from Tashs t where t.uname=?',
		uname,
		callback);
};

exports.getTashsByFollowing = function(uname, callback){
	db.all('select t.uname as uname, t.content as content, t.tdate as tdate, u.fname as fname, u.lname as lname from Tashs t join (select f.followee from Following f where f.follower=? and f.followee!=?) as tmp on tmp.followee=t.uname join Users u on u.uname=t.uname order by t.tdate desc',
		uname, uname,
		callback);
};

exports.getNewsFeed = function(uname, callback){
	db.all('select t.uname as uname, t.content as content, t.tdate as tdate, u.fname as fname, u.lname as lname from Tashs t join (select f.followee from Following f where f.follower=?) as tmp on tmp.followee=t.uname join Users u on u.uname=t.uname order by t.tdate desc',
		uname,
		callback);
};
