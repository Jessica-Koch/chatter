(function() {
    function ModalInstanceCtrl($scope, $modalInstance, $http, Room) {
        // Add a Item to the list
        $scope.rooms = Room;
        var roomKey = $scope.rooms.length;
        $scope.addRoom = function() {
            $scope.rooms.all.$add({
                name: $scope.rooms.chatroom
            }).then(function(ref) {
                var id = ref.key;
                $scope.rooms.all.$indexFor(id);
            });
            $modalInstance.close();
            $scope.rooms.chatroom = "";
        }


        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }

    angular.module('chatter').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'Room', ModalInstanceCtrl])
})();
