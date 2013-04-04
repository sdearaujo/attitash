/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes/user-session.js')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// request handlers for various pages, routes to functions
app.get('/', user.login);
app.get('/login', user.login);
app.post('/login'  , user.auth);

app.get('/home', user.home);
app.get ('/logout', user.logout);
app.get('/settings', user.settings);
app.get('/me', user.me);
app.get('/register', user.register);
app.post('/register', user.addUser);
app.get('/discover', user.discover);
app.get('/connect', user.connect);

app.post('/tash/create', user.tash);

app.post('/follow', user.follow);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
