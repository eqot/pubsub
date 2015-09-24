'use strict';

var pubsub = new Pubsub('bipresent');

var sendMessage = $('#sendMessage');
var receiveMessage = $('#receiveMessage');

sendMessage.on('keypress', function (e) {
  if (e.keyCode === 13) {
    var message = sendMessage.val();
    if (message.length === 0) {
      return false;
    }

    pubsub.publish(message);

    sendMessage.val(null);

    return false;
  }

  return true;
});

pubsub.subscribe(function (message) {
  var item = $('<li>')
    .addClass('list-group-item')
    .text(message.text);

  receiveMessage.append(item);

  if (receiveMessage.children('li').length >= 5) {
    receiveMessage.children('li').first().remove();
  }
});
