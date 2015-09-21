(function () {
  'use strict';

  function Pubsub (channel) {
    this.channel = channel;

    this.socket = io();
  };

  Pubsub.prototype.publish = function (message) {
    this.socket.emit('publish', {
      id: this.channel,
      text: message
    });
  };

  Pubsub.prototype.subscribe = function (callback) {
    this.socket.emit('subscribe', this.channel);

    this.socket.on('send', function (message) {
      callback(message);
    });
  };

  window.Pubsub = Pubsub;
})();
