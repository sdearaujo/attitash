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
	console.log(tashsdb);
	cb(undefined, tash);
};

exports.getTashsByUsername = function(username, cb){
  var tashs = [];
  for (var i = 0; i < tashsdb.length; i++) {
    var t = tashsdb[i];
    if(t.author === username){
    	console.log(t.author + " === " + username);
      	tashs.push(t);
    }
  }
  console.log("tashsDB: " + tashs);
  cb(undefined, tashs);
};