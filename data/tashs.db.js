var tash = require('../lib/tash.js');
var userdb = require('../data/user.db.js');

// # In Memory Tashs Database
var tashsdb = [
	tash.createTash('anthony', "Test Tash anthony"),
	tash.createTash('brian', "Test Tash brian"),
	tash.createTash('john', "Test Tash john"),
	tash.createTash('sam', "Test Tash sam")
];

// ## insert
// ###Stores a tash object in the "db"
// @param {object} tash The tash object to be stored
// @param {Function} cb Callback
exports.insert = function(tash, cb){
	tashsdb.push(tash);
	tashsdb.sort(function (t1, t2) {
		return t1.date < t2.date;
    });
	cb(undefined, tash);
};

// ## getTashByUsername
// ###Retrieve tashes by a specified user
// @param {string} username user whose tashes we want
// @param {Function} cb Callback
exports.getTashsByUsername = function(username, cb){
  var tashs = [];
  for (var i = 0; i < tashsdb.length; i++) {
    var t = tashsdb[i];
    if(t.author === username){
      	tashs.push(t);
    }
  }
  cb(undefined, tashs);
};