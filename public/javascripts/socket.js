 var socket = io.connect();
 
 $(function () {
	socket.on('new tash error', function (err) {
		//what to do when a error come?
	});
	socket.on('new tash success', function(data){
		//how can I add a new tash without refresh the page using ajax
	});
});
 
 $('#send_tash,#send_tash_modal').submit(function(e) {
    e.preventDefault();
	message = $('#send_tash .new_tash, #send_tash_modal .new_tash').val();
	//username = how can I get the username here?
	socket.emit('new tash',{ uname: "jj", text: message});
});
