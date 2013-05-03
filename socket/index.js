var clients = {};
var sockets;
var socketsOfClients = {};

exports.init = function (socket, io) {
		sockets = io.sockets;
    	socket.on('set username', function(userName) {
		// Is this an existing user name?
		if (clients[userName] === undefined) {
		  // Does not exist ... so, proceed
		  clients[userName] = socket.id;
		  socketsOfClients[socket.id] = userName;
		  userNameAvailable(socket.id, userName);
		userJoined(userName, io);
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
		  sockets.sockets[clients[msg.target]].emit('message', 
			  {"source": srcUser,
			   "message": msg.message,
			   "messageTarget": msg.messageTarget,
			   "target": msg.target});
	  })

	  socket.on('disconnect', function() {
		var uName = socketsOfClients[socket.id];
		delete socketsOfClients[socket.id];
		delete clients[uName];
	  // relay this message to all the clients
		userLeft(uName);
	  })
	};


function userJoined(uName) {
  Object.keys(socketsOfClients).forEach(function(sId) {
    sockets.sockets[sId].emit('userJoined', { "userName": uName, "currentUsers": JSON.stringify(Object.keys(clients)) });
  })
}

function userLeft(uName) {
    sockets.emit('userLeft', { "currentUsers": JSON.stringify(Object.keys(clients)) });
}

function userNameAvailable(sId, uName) {
  setTimeout(function() {
    console.log('Sending welcome msg to ' + uName + ' at ' + sId);
    sockets.sockets[sId].emit('welcome', { "userName" : uName, "currentUsers": JSON.stringify(Object.keys(clients)) });
  }, 10);
}

function userNameAlreadyInUse(sId, uName) {
  setTimeout(function() {
    sockets.sockets[sId].emit('error', { "userNameInUse" : true });
  }, 500);
}
