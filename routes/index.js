
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
  	userName: 'AttitashDev'
  });
};

exports.login = function(req, res){
  res.render('login', {	title: 'Attitash' });
};


exports.register = function(req, res){
  res.render('register', {	title: 'Attitash' });
};

