'use strict';

var pubsub = new Pubsub('bipresent');

var sendMessage = $('#sendMessage');
var emojiButtons = $('#emojiButtons button');
var receiveMessage = $('#receiveMessage');

var KEY_EMOJI_MAP = {
  38: 'thumbsUp',
  37: 'question',
  39: 'smile',
  40: 'thumbsDown'
};

sendMessage.on('keydown', function (e) {
  if (e.keyCode === 13) {
    var message = sendMessage.val();
    if (message.length === 0) {
      return false;
    }

    pubsub.publish(message);
    addMessage(message);
    sendMessage.val(null);

    return false;
  } else {
    if (sendMessage.val().length === 0) {
      var emojiId = KEY_EMOJI_MAP[e.keyCode];
      if (emojiId) {
        pubsub.publish(emojiId);
        addMessage(emojiId);

        return false;
      }
    }
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
