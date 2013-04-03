var tash = require('../lib/tash.js');
var userdb = require('../data/user.db.js');

var tashsdb = [
	tash.createTash('anthony', "Test Tash anthony"),
	tash.createTash('brian', "Test Tash brian"),
	tash.createTash('john', "Test Tash john"),
	tash.createTash('sam', "Test Tash sam")
];

exports.insert = function(tash, cb){
	tashsdb.push(tash);
	tashsdb.sort(function (t1, t2) {
		return t1.date < t2.date;
    });
	cb(undefined, tash);
};

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