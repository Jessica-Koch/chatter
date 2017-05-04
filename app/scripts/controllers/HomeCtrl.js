(function () {
    function HomeCtrl ($scope, Room, Message) {
        this.room = Room;
        $scope.rooms = this.room.all;

        // $scope.getByRoomId = Message.getByRoomId;
        $scope.getByRoomId = function(roomId){
            $scope.messages = Message.getByRoomId(roomId);
        }

        $scope.activeChatroom = null;

        // returns active chatroom
        $scope.activate = function () {
          $scope.activeChatroom = this.rm;
          $scope.getByRoomId($scope.activeChatroom.$id);
        }

    }

    angular
        .module('chatter')
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', HomeCtrl])
})();
