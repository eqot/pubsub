'use strict';

var url = require('url');

var pubsub = function () {
  var io = null;

  var create = function (server) {
    io = require('socket.io')(server, {transports: ['polling']});

    io.on('connection', function (socket) {
      console.log('a user connected');

      socket.on('disconnect', function () {
        console.log('user disconnected');
      });

      socket.on('subscribe', function (channel) {
        socket.join(channel);
      });

      socket.on('publish', function (message) {
        io.to(message.channel).emit('send', message);
      });
    });
  };

  return {
    create: create
  }
}();

module.exports = pubsub;
