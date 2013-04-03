/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes')
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
app.get('/user/login', user.login);
app.get('/user/home', user.home);
app.post('/user/auth'  , user.auth);
app.get ('/user/logout', user.logout);
app.get('/user/settings', user.settings);
app.get('/user/me', user.me);
app.get('/user/register', user.register);
app.get('/user/discover', user.discover);
app.get('/user/register', user.register);
app.get('/user/connect', user.connect);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
