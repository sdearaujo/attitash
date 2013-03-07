
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
  	userName: 'AttitashDev',
  	tashs: [
  		{	img_src: "images/windows.png",
  			name: "Windows",
  			username: "Windows", 
  			tash_text: "Windows 8 is off to a worse start than Vista! #letsgo #metro"
  		},
  		{	img_src: "images/twitter.png",
  			name: "Twitter",
  			username: "Twitter", 
  			tash_text: "Attitash has stolen all of our users! #ohno #attitash"	

  		}
  	],
  	who_to_follow: [
  		{	img_src: "images/george.jpg",
  			name: "George Costanza",
  			username: "Costanza", 
  			followed_by: "Windows"
  		},
  		{	img_src: "images/kramer.jpg",
  			name: "Cosmo Kramer",
  			username: "K-Man", 
  			followed_by: "Jerry Seinfeld"
  		},
  		{	img_src: "images/sein.jpg",
  			name: "Jerry Seinfeld",
  			username: "Seinfeld", 
  			followed_by: "Twitter"
  		}
  	]
  });
};

exports.login = function(req, res){
  res.render('login', {	title: 'Attitash' });
};


exports.register = function(req, res){
  res.render('register', {	title: 'Attitash' });
};

