'use strict';

var socket = io();

socket.emit('subscribe', 'foo');

var sendButton = document.querySelector('#send');
sendButton.addEventListener('click', function () {
  socket.emit('publish', {
    id: 'foo',
    text: 'test'
  });
});

var receiveList = document.querySelector('#receive');
socket.on('message', function (msg) {
  var li = document.createElement('li');
  li.innerHTML = msg;

  receiveList.appendChild(li);
});
