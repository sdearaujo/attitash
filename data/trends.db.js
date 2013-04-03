var tash = require('../lib/tash.js');
var userdb = require('../data/user.db.js');

// ## In Memory Trends Database
var trendsdb = ["attitash", "cs326", "jingleheimer", "roflmao", "bootstrap", "betterthantwitter", "tash"];

// ##insert
// #Insert Trend into "db"
// @param {Object} trend Object being stored
exports.insert = function(tag, cb){
	trendsdb.push(trend);
	cb(undefined, trend);
};

exports.getTrends = function(cb){
  cb(undefined, trendsdb);
};