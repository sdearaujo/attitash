/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index.js')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , socketio = require('socket.io');

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
app.post('/register', routes.addUser);
app.get('/discover', routes.discover);
app.get('/connect', routes.connect);
app.post('/tash/create', routes.tash);
app.post('/follow', routes.follow);

var server = http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port "+ app.get('port') +" in "+ app.get('env') +" mode.");
});

/*
* Socket.IO
*/

var io = socketio.listen(server);
var chatApp = require('./chat');

var clients = {};

var socketsOfClients = {};

io.sockets.on('connection', function(socket) {
  socket.on('set username', function(userName) {
    // Is this an existing user name?
    if (clients[userName] === undefined) {
      // Does not exist ... so, proceed
      clients[userName] = socket.id;
      socketsOfClients[socket.id] = userName;
      userNameAvailable(socket.id, userName);
    userJoined(userName);
    } else
    if (clients[userName] === socket.id) {
      // Ignore for now
    } else {
      userNameAlreadyInUse(socket.id, userName);
    }
  });

  socket.on('message', function(msg) {
    var srcUser;
    if (msg.inferSrcUser) {
      // Infer user name based on the socket id
      srcUser = socketsOfClients[socket.id];
    } else {
      srcUser = msg.source;
    }
    if (msg.target == "All") {
      // broadcast
      io.sockets.emit('message',
          {"source": srcUser,
           "message": msg.message,
           "target": msg.target});
    } else {
      // Look up the socket id
      io.sockets.sockets[clients[msg.target]].emit('message', 
          {"source": srcUser,
           "message": msg.message,
           "target": msg.target});
    }
  })

  socket.on('disconnect', function() {
    var uName = socketsOfClients[socket.id];
    delete socketsOfClients[socket.id];
    delete clients[uName];
  // relay this message to all the clients
  userLeft(uName);
  })
})

function userJoined(uName) {
  Object.keys(socketsOfClients).forEach(function(sId) {
    io.sockets.sockets[sId].emit('userJoined', { "userName": uName });
  })
}

function userLeft(uName) {
    io.sockets.emit('userLeft', { "userName": uName });
}

function userNameAvailable(sId, uName) {
  setTimeout(function() {
    console.log('Sending welcome msg to ' + uName + ' at ' + sId);
  
    io.sockets.sockets[sId].emit('welcome', { "userName" : uName, "currentUsers": JSON.stringify(Object.keys(clients)) });
  }, 500);
}

function userNameAlreadyInUse(sId, uName) {
  setTimeout(function() {
    io.sockets.sockets[sId].emit('error', { "userNameInUse" : true });
  }, 500);
}
