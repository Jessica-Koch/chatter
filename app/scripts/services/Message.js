(function() {
    function Message($firebaseArray) {
        var ref = firebase.database().ref().child("messages");
        var msgs = $firebaseArray(ref);

        /**
        * Filter messages by room id
        * @return {[type]} [description]
        */
        Message.getRoomById = function (roomId) {
            msgs = $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));
        }

        return Message;
}
    angular
        .module('chatter')
        .factory('Message', ['$firebaseArray', Message])
})();
