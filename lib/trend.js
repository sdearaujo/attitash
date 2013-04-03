// ## Trend Object
// @param {string} tag Tag
function Trend(tag){
	this.tag = tag;
}

// ## createTrend
// ## Wrapper for constructor Function
exports.createTrend = function(tag){
	return new Trend(tag);
}