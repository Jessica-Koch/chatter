(function () {
    function HomeCtrl ($scope, Room, Message) {
        this.room = Room;
        $scope.rooms = this.room.all;

        $scope.isActive = false;

        /**
         * Check to show and hide dropdown
         */
        $scope.activeDropdown = function () {
            $scope.isActive = !$scope.isActive;
        }

        /**
         * Returns the room that the messages should go to
         * @param  { String } roomId Id for the chatroom
         * @return { Object } Returns the room
         */
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
            $scope.msg = "";
        }

    }

    angular
        .module('chatter')
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', HomeCtrl])
})();
