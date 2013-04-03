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