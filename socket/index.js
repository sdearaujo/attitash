var tashDB = require('../lib/tashs.js');


exports.init = function (socket) {
    	socket.on('new tash', function (data) {
		client = JSON.stringify(data);
		// add the websocket tash to the data base
		tashDB.addTash(client.username, client.text, new Date().toISOString(), function(err){
			if(err){
				io.sockets.emit('new tash error', "error creating tash!");
				
				//if there are no errors emit the tash
			}else{
				io.sockets.emit('new tash success', data);
			}
    		});
	});
}
