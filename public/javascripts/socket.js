 var socket = io.connect();
 
 $(function () {
	socket.on('new tash error', function (err) {
		console.log("error: " + err);
	});
	socket.on('new tash success', function(data){
		client = JSON.stringify(data);
		console.log(client);
	});
});
 
 $('#send_tash,#send_tash_modal').submit(function(e) {
    e.preventDefault();
	socket.emit('new tash',{username: "jj", text: "aaaa"});
    $.ajax({
        method: "POST",
        url: "/tash/create",
        success: function(data, textStatus, jqXHR){
            console.log("DATA:" + data);
        }
        error: function(jqXHR, textStatus, errorThrown){
            console.log("error: " + errorThrown);
        }
    });
	return false;
});
