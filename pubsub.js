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
    });
  };

  return {
    create: create
  }
}();

module.exports = pubsub;
