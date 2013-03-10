
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.home = function(req, res){
  res.render('home', { 
  	title: 'Attitash',
  	user: 'AttitashDev',
  	userName: 'John Jacob Jingleheimer Schmidt'
  });
  
  exports.settings = function(req, res){
  	res.render('settings', {
	title: 'Attitash',
  	user: 'AttitashDev',
  	userName: 'John Jacob Jingleheimer Schmidt'
};