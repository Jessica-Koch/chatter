(function() {
    function Room($firebaseArray) {
        var ref = firebase.database().ref().child("rooms");
        var rooms = $firebaseArray(ref);

        Room.all = rooms;

        return Room;
    }

    angular
        .module('chatter')
        .factory('Room', ['$firebaseArray', Room]);
})();
