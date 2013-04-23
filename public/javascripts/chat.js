var socket;
var myUserName;
var users = $("#users");
var selected = $("#selected");

socket = io.connect();

var chatTable = {};

$('#chatModal').bind('hide', function(){
  $('#msgWindow').html('');
});

$('#chatModal').bind('show', function(){
  $('#msgWindow').html('');
  var selectedUser = $('#selected').html();
  var chatLog = chatTable[selectedUser];
  if(chatLog){
    for(var i = 0; i < chatLog.length; i++){
      var msg = JSON.parse(chatLog[i]);
      var html;
      html = "<span class='privMsg'>" + msg.source + " : " + msg.message + "</span><br/>"
      $('#msgWindow').prepend(html);
    }
  }
});

function enableMsgInput(enable) {
  $('input#msg').prop('disabled', !enable);
}

function appendNewMessage(msg) {
  if(msg.messageTarget !== selected.text())
    return;
  var chatLog = chatTable[msg.messageTarget];
  var msg = JSON.parse(chatLog[0]);
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
                  "messageTarget": you,
                  "target": trgtUser
                });

    socket.emit('message', 
                {
                  "inferSrcUser": true,
                  "source": "",
                  "message": $('input#msg').val(),
                  "messageTarget": trgtUser,
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
    console.log("msg target: " + msg.messageTarget);
    var chatLog = chatTable[msg.messageTarget];
    if(chatLog){
      chatLog.unshift(JSON.stringify({"source": msg.source, "message": msg.message}));
    }
    else{
      chatTable[msg.messageTarget] = [JSON.stringify({"source": msg.source, "message": msg.message})];
    }
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
