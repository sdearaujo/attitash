var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/attitash.db');

exports.addFollowByUsername = function(follower, followee, callback){
	db.run('insert into Following values(?, ?)',
		follower, followee,
		callback);
}

exports.getFollowingByUsername = function(uname, callback){
	db.all('select u.uname, u.fname, u.lname from Following f, Users u where f.follower=? and f.followee!=? and u.uname=f.followee;',
		uname, uname,
		callback);
};

exports.getFollowersByUsername = function(uname, callback){
	db.all('select u.uname, u.fname, u.lname from Following f, Users u where f.followee=? and f.follower!=? and u.uname=f.follower;',
		uname, uname,
		callback);
};

exports.getWhoToFollowByUsername = function(uname, callback){
	db.all('select u.uname, u.fname, u.lname from Users u where u.uname != ? and u.uname not in (select f.followee from Following f where f.follower=?) limit 4',
		uname, uname,
		callback);	
};

exports.countFollowersByUsername = function(uname, callback){
	db.get('select count(*) as follower_count from Following f where f.followee=? and f.follower!=?',
		uname, uname,
		callback);
};

exports.countFollowingByUsername = function(uname, callback){
	db.get('select count(*) as following_count from Following f where f.follower=? and f.followee!=?',
		uname, uname,
		callback);
};

exports.getMutualFollowersByUsername = function(uname, callback){
	db.all('select flwe.followee as follower from (select f1.followee as followee from Following f1 where f1.follower=? and f1.followee!=f1.follower) as flwe join (select f2.follower as follower from Following f2 where f2.followee=? and f2.followee!=f2.follower) as flwr on flwe.followee=flwr.follower',
		uname, uname,
		callback);
};