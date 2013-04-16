var socket;
var myUserName;
var users = $("#users");
var selected = $("#selected");

socket = io.connect();

function enableMsgInput(enable) {
  $('input#msg').prop('disabled', !enable);
}

function appendNewMessage(msg) {
  var html;
    html = "<span class='privMsg'>" + msg.source + " : " + msg.message + "</span><br/>"
  $('#msgWindow').append(html);
}

function appendNewUser(uName, notify) {
  users.append('<li><a class="userNick" href="#chatModal" data-toggle="modal">'+ uName +'</a></li>');
  $('.userNick').on("click", function() {
                selected.html($(this).text());
        });
}

function setUsername() {
  myUserName = $.cookie("auname");
    socket.emit('set username', $.cookie("auname"), function(data) { console.log('emit set username', data); });
    console.log('Set user name as ' + $.cookie("auname"));
}

function sendMessage() {
    var trgtUser = selected.text();
    var you = $.cookie("auname");

    socket.emit('message', 
                {
                  "inferSrcUser": true,
                  "source": "",
                  "message": $('input#msg').val(),
                  "target": trgtUser
                });

    socket.emit('message', 
                {
                  "inferSrcUser": true,
                  "source": "",
                  "message": $('input#msg').val(),
                  "target": you
                });
    $('input#msg').val("");
}

function setCurrentUsers(usersStr) {
    users.html('');
    JSON.parse(usersStr).forEach(function(name) {
        appendNewUser(name, false);
    });
     $('.userNick').on("click", function() {
                selected.html($(this).text());
        });
 }

$(function() {
  enableMsgInput(false);
  setUsername();
  socket.on('userJoined', function(msg) {
    appendNewUser(msg.userName, true);
  });
  
  socket.on('userLeft', function(msg) {
    setCurrentUsers(msg.currentUsers);
  });

  socket.on('message', function(msg) {
    appendNewMessage(msg);
  });

  socket.on('welcome', function(msg) {
    setCurrentUsers(msg.currentUsers)
    enableMsgInput(true);
  });
  
  $('input#msg').keypress(function(e) {
      if (e.keyCode == 13) {
          sendMessage();
          e.stopPropagation();
          e.stopped = true;
          e.preventDefault();
      }
  });
});
