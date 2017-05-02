(function () {
    function HomeCtrl ($scope, Room, Message) {
        this.room = Room;
        var message = Message;

        this.rooms = this.room.all;


        $scope.activeChatroom = null;
        // returns active chatroom
        $scope.activate = function () {
          $scope.activeChatroom = this.rm;
        }

        this.messages = function(roomId) {
            message.getRoomById(roomId);
        }
    }

    angular
        .module('chatter')
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', HomeCtrl]);
})();
