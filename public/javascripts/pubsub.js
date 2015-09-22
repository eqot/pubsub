(function () {
  'use strict';

  function Pubsub (channel, url) {
    this.channel = channel;

    this.socket = io(url);
  };

  Pubsub.prototype.publish = function (message) {
    this.socket.emit('publish', {
      channel: this.channel,
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
