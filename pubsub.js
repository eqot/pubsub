'use strict';

var express = require('express');
var router = express.Router();

var io = null;

router.create = function (server) {
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

router.get('/:channel/:message', function(req, res, next) {
  var message = {
    channel: req.params.channel,
    id: 0,
    text: req.params.message.toString()
  };

  io.to(message.channel).emit('send', message);

  res.end();
});

module.exports = router;
