var user = require('../lib/user');

// We use this to communicate messages between redirects. Because
// this is a global variable we can only support a single user.
var authmessage;

// # User Server-Side Routes

// ## login
// Provides a user login view.
exports.login = function(req, res){
  var message = authmessage || '';  // capture a message if it exists.
  authmessage = undefined;          // reset authmessage.
  res.render('login', { title   : 'User Login',
                        message : message });
};

// ## auth
// Performs **basic** user authentication.
exports.auth = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  user.lookup(username, password, function(error, user) {
    if (error) {
      authmessage = error;          // capture the error message.
      res.redirect('/user/login');
    }
    else {
      authmessage = user;
      res.redirect('/user/home');   // capture the user object.
    }
  });
};

// ## logout
// Does nothing!
exports.logout = function(req, res) {
  res.redirect('/user/login');
};

// ## main
// The main user view.
exports.home = function(req, res){
    // capture the user object or create a default.
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;

  res.render('home', { 
    title: 'Attitash - Home',
    message: 'Login Successful!',
    username: message.username,
    password: message.password,
    // mock tash values.<br>
    // <b>img_src:</b> location of image, to be placed in "img src="img_src value"<br>
    // <b>name:</b> account name<br>
    // <b>username:</b> account handle<br>
    // <b>tash_text:</b> text content of the mock tash
    tashs: [
      { img_src: "https://si0.twimg.com/profile_images/81302971/facebook_favicon_large_2_normal.png",
        name: "Facebook",
        username: "facebook", 
        tash_text: "@Twitter we're losing all of our users too! #Attitash"
      },
      { img_src: "images/windows.png",
        name: "Windows",
        username: "Windows", 
        tash_text: "Windows 8 is off to a worse start than Vista! #letsgo #metro"
      },
      { img_src: "images/twitter.png",
        name: "Twitter",
        username: "Twitter", 
        tash_text: "Attitash has stolen all of our users! #ohno #attitash"  

      },
      { img_src: "https://si0.twimg.com/profile_images/2479480809/mz1rwdt3gafsda7vc3bc_normal.png",
        name: "NHL",
        username: "NHL", 
        tash_text: "Can anybody stop the @Blackhawks? #wow"
      },
      { img_src: "https://si0.twimg.com/profile_images/1639045599/twcilogo_blue_300_normal.png",
        name: "The Weather Channel",
        username: "weatherchannel", 
        tash_text: "More crappy weather expected for Amherst, MA #whatasurprise"
      },
      { img_src: "https://si0.twimg.com/profile_images/1980294624/DJT_Headshot_V2_normal.jpg",
        name: "Donald Trump",
        username: "realDonaldTrump", 
        tash_text: "Invested $500K in @AttitashDev months before launch #easiestmoneyiveevermade"
      },
      { img_src: "https://si0.twimg.com/profile_images/2176846885/-5-1_normal.jpeg",
        name: "TechCrunch",
        username: "TechCrunch", 
        tash_text: "Meet the new social media application that's leaving Twitter wondering what happened #Attitash"
      },
      { img_src: "https://si0.twimg.com/profile_images/1824717932/Forbes_Icon_normal.png",
        name: "Forbes",
        username: "Forbes", 
        tash_text: "@AttitashDev raises $500M in Series A funding #goodbyetwitter"
      },
      { img_src: "https://si0.twimg.com/profile_images/2622227823/gjh9bijjnrnrb8hderzb_normal.jpeg",
        name: "Life At Google",
        username: "googlejobs", 
        tash_text: "Really hope @AttitashDev comes and works for us someday #googleplusstinks"
      },
      { img_src: "https://si0.twimg.com/profile_images/1325797300/2804546757_5d034c1d29_normal.jpg",
        name: "Most Interesting Man In The World",
        username: "DosEquisMan", 
        tash_text: "I don't always use social media, but when I do...I use #Attitash"
      },
      { img_src: "https://si0.twimg.com/profile_images/2945466711/12e018532d913494d841f79da5dd70bf_normal.png",
        name: "LinkedIn",
        username: "LinkedIn", 
        tash_text: "Why we're choosing #Attitash over Twitter #becauseitsbetter"
      },
      { img_src: "https://si0.twimg.com/profile_images/2733309600/9d7fe1c410d086364129c720e089ebf2_normal.jpeg",
        name: "Kate Upton",
        username: "KateUpton", 
        tash_text: "Hey @AttitashDev guys...call me? :)"
      },
      { img_src: "https://si0.twimg.com/profile_images/2186836571/128x128_twitter_bbc_world_normal.jpg",
        name: "BBC News (World)",
        username: "BBCWorld", 
        tash_text: "#Attitash is largest social network in the world, Twitter a distant 2nd #whatsatweetanyway"
      },
      { img_src: "https://si0.twimg.com/profile_images/937374385/Mark_Zuckerberg_szykuja_3268108_normal.jpg",
        name: "Mark Zuckerberg",
        username: "zuckerberg", 
        tash_text: "Sooo I just used #Attitash for the first time...#shuttingdownfacebook #thisiswaycooler"
      },
      
    ],

    trends: ["attitash", "cs326", "jingleheimer", "roflmao", "bootstrap", "betterthantwitter", "tash"]
  });
};

exports.online = function(req, res) {
  // A stub function we fill in `user-after.js`.
  res.send('You are the only one online!');
};
