/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index.js')
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
app.get('/login', routes.login);
app.post('/login'  , routes.auth);

app.get('/home', routes.home);
app.get('/logout', routes.logout);
app.get('/settings', routes.settings);
app.get('/me', routes.me);
app.get('/register', routes.register);
app.post('/register', routes.addUser);
app.get('/discover', routes.discover);
app.get('/connect', routes.connect);

app.post('/tash/create', routes.tash);
app.post('/follow', routes.follow);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
