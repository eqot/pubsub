(function () {
  'use strict';

  function Pubsub (channel, url) {
    this.message = {
      channel: channel,
      id: Pubsub.getId(),
      text: null
    };

    this.socket = io(url);
  };

  Pubsub.getId = function () {
    var id = null;
    if (localStorage && localStorage.id) {
      id = localStorage.id;
    } else {
      id = Pubsub.generateId();

      if (localStorage) {
        localStorage.id = id;
      }
    }

    return id;
  };

  Pubsub.generateId = function () {
    return 'xxxxxxxx'.replace(/x/g, function () {
      return (Math.random() * 36 | 0).toString(36);
    });
  };

  Pubsub.prototype.publish = function (text) {
    this.message.text = text;

    this.socket.emit('publish', this.message);
  };

  Pubsub.prototype.subscribe = function (callback) {
    this.socket.emit('subscribe', this.message.channel);

    this.socket.on('send', function (message) {
      callback(message);
    });
  };

  window.Pubsub = Pubsub;
})();
