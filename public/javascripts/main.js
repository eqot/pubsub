'use strict';

var socket = io();

var sendButton = document.querySelector('#send');
sendButton.addEventListener('click', function () {
  socket.emit('chat message', 'test');
});
