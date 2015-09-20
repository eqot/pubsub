'use strict';

var socket = io();

var sendButton = document.querySelector('#send');
sendButton.addEventListener('click', function () {
  socket.emit('chat message', 'test');
});


var receiveList = document.querySelector('#receive');
socket.on('chat message', function (msg) {
  var li = document.createElement('li');
  li.innerHTML = msg;

  receiveList.appendChild(li);
});
