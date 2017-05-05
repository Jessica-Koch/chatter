(function () {
    function HomeCtrl ($scope, Room, Message) {
        this.room = Room;
        $scope.rooms = this.room.all;

        $scope.isActive = false;

        $scope.activeDropdown = function () {
            $scope.isActive = !$scope.isActive;
        }

        $scope.getByRoomId = function(roomId){
            $scope.messages = Message.getByRoomId(roomId);
        }

        $scope.activeChatroom = null;

        // returns active chatroom
        $scope.activate = function () {
          $scope.activeChatroom = this.rm;
          $scope.getByRoomId($scope.activeChatroom.$id);
        }

        $scope.sendMessage = function() {
            $scope.send = Message.send(this.msg, $scope.activeChatroom);
        }

    }

    angular
        .module('chatter')
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', HomeCtrl])
})();
