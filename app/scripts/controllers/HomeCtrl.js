(function () {
    function HomeCtrl ($scope, Room) {

        $scope.rooms = Room.all;
    }

    angular
        .module('chatter')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();
