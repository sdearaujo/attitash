function Tash(author, text){
	this.author = author;
	this.text = text;
	this.date = new Date();
};

exports.createTash = function(author, text){
	return new Tash(author, text);
};