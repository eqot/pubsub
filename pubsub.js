'use strict';

var url = require('url');

var pubsub = function () {
  var io = null;

  var create = function (server) {
    io = require('socket.io')(server);

    io.on('connection', function(socket){
      console.log('a user connected');

      socket.on('disconnect', function(){
        console.log('user disconnected');
      });

      socket.on('chat message', function(msg){
        console.log('message: ' + msg);

        io.emit('chat message', msg);
      });
    });
  };

  return {
    create: create
  }
}();

module.exports = pubsub;
