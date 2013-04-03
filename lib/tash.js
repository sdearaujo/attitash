
// ## Tash()
// #### tash object
// @param {string} author The originator of the content
// @param {string} text Content of the tash
function Tash(author, text){
	this.author = author;
	this.text = text;
	// ## tag it with a date
	this.date = new Date();
};

// ## Wrapper for constructor function
exports.createTash = function(author, text){
	return new Tash(author, text);
};