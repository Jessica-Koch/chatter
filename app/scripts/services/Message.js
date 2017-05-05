(function() {
  function Message($firebaseArray) {
    var Message = {};
    var ref = firebase.database().ref().child("messages");

    Message.getByRoomId = function(roomId) {
        // Filter the messages by their room ID.
         return $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));

    };

    Message.send = function(newMessage) {
        var messages = $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));
    }

    return Message;

  }

  angular
    .module('chatter')
    .factory('Message', ['$firebaseArray', Message]);
})();
