var tash = require('../lib/tash.js');
var userdb = require('../data/user.db.js');

var trendsdb = ["attitash", "cs326", "jingleheimer", "roflmao", "bootstrap", "betterthantwitter", "tash"];

exports.insert = function(tag, cb){
	trendsdb.push(tash);
	cb(undefined, tag);
};

exports.getTrends = function(cb){
  cb(undefined, trendsdb);
};