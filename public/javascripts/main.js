'use strict';

var pubsub = new Pubsub('bipresent');

var sendButton = document.querySelector('#send');
sendButton.addEventListener('click', function () {
  pubsub.publish('hello');
});

var receiveList = document.querySelector('#receive');
pubsub.subscribe(function (message) {
  var li = document.createElement('li');
  li.innerHTML = message;

  receiveList.appendChild(li);
});
