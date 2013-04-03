function Trend(tag){
	this.tag = tag;
}

exports.createTrend = function(tag){
	return new Trend(tag);
}