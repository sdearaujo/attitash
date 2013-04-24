/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index.js')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , socketio = require('socket.io')
  , socketConnection = require('./socket/index.js');

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
app.get('/', routes.login);
app.get('/login', routes.login);
app.post('/login'  , routes.auth);
app.get('/home', routes.home);
app.get('/logout', routes.logout);
app.get('/settings', routes.settings);
app.get('/me', routes.me);
app.get('/register', routes.register);
app.get('/discover', routes.discover);
app.get('/connect', routes.connect);
app.post('/register', routes.addUser);
app.post('/tash/create', routes.tash);
app.post('/follow', routes.follow);
app.get('/followers/mutual', routes.getMutualFollowers);

var server = http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port "+ app.get('port') +" in "+ app.get('env') +" mode.");
});

/*
* Socket.IO
*/
var io = socketio.listen(server);

//connect to web sockets
io.sockets.on('connection', function(socket) {
	socketConnection.init(socket, io);
});

