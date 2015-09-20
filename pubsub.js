'use strict';

var url = require('url');

var pubsub = function () {
  var io = null;

  var create = function (server) {
    io = require('socket.io')(server);

    io.on('connection', function (socket) {
      console.log('a user connected');

      socket.on('disconnect', function () {
        console.log('user disconnected');
      });

      socket.on('subscribe', function (id) {
        socket.join(id);
      });

      socket.on('publish', function (message) {
        io.to(message.id).emit('message', message.text);
      });
    });
  };

  return {
    create: create
  }
}();

module.exports = pubsub;
