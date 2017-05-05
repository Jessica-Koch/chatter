(function() {
    function Message($firebaseArray, $cookies) {
        var Message = {};
        var ref = firebase.database().ref().child("messages");
        var allMessages = $firebaseArray(ref);

        Message.getByRoomId = function(roomId) {
            // Filter the messages by their room ID.
            return $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));

        };

        Message.send = function(newMessage, roomId) {
            var username = $cookies.username,
            timeStamp = new Date().toLocaleString(),
            chatRoom = roomId.$id,
            messages = $firebaseArray(ref.orderByChild('roomId').equalTo(chatRoom));

            messages.$add({
                username: username,
                content: newMessage,
                sentAt: timeStamp,
                roomId: chatRoom
            })
        }

        return Message;

    }

    angular.module('chatter').factory('Message', ['$firebaseArray', '$cookies', Message]);
})();
