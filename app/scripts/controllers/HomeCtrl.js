(function () {
    function HomeCtrl ($scope, Room, Message) {
        this.room = Room;

        $scope.rooms = this.room.all;

        // this.messages = this.ssage.getRoomById;

        $scope.activeChatroom = null;

        // returns active chatroom
        $scope.activate = function () {
          $scope.activeChatroom = this.rm;
          console.log(Message.getRoomById($scope.activeChatroom))

            // console.log(Message.getByRoomId($scope.activeChatroom))
        }

        $scope.messages = function () {
            return Message.getByRoomId($scope.activeChatroom);
        }

    }

    angular
        .module('chatter')
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', HomeCtrl]);
})();
