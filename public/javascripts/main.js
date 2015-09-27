'use strict';

var pubsub = new Pubsub('bipresent');

var sendMessage = $('#sendMessage');
var emojiButtons = $('#emojiButtons button');
var receiveMessage = $('#receiveMessage');

sendMessage.on('keypress', function (e) {
  if (e.keyCode === 13) {
    var message = sendMessage.val();
    if (message.length === 0) {
      return false;
    }

    pubsub.publish(message);

    sendMessage.val(null);

    addMessage(message);

    return false;
  }

  return true;
});

emojiButtons.on('click', function () {
  var emojiId = $(this).attr('id');

  pubsub.publish(emojiId);

  addMessage(emojiId);

  return false;
});

function addMessage (message) {
  var item = $('<li>')
    .addClass('list-group-item list-highlight');

  var emojiId = Pubsub.getEmojiId(message);
  if (emojiId) {
    item.append($('<i>').addClass('fa ' + emojiId));
  } else {
    item.text(message);
  }

  receiveMessage.append(item);

  setTimeout(function () {
    item.removeClass('list-highlight');
  }, 50);

  if (receiveMessage.children('li').length >= 4) {
    receiveMessage.children('li').first().remove();
  }
}
