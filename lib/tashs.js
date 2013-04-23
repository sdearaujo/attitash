var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/attitash.db');

exports.addTash = function(username, content, callback){
	db.run('insert into Tashs values (?, ?, current_timestamp)',
		username, content,
		exports.getLastTash(username, callback));
};

exports.getTashByHashTag = function(hashTag, callback){
        db.get('select * from Tash t where content like ?',
                hashTag,
                callback);
}

exports.getLastTash = function(username, callback){
	db.all('select u.fname as fname, u.lname as lname, t.uname as uname, t.content as content, t.tdate as tdate from Users u, Tashs t where t.uname=? and t.uname=u.uname order by t.tdate desc limit 1',
		username,
		callback);
};

exports.getTashsByUsername = function(uname, callback){
	db.all('select u.fname, u.lname, u.uname, t.content, t.tdate from Users u, Tashs t where t.uname=? and t.uname=u.uname order by t.tdate desc',
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
