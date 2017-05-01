(function() {
    function PopupCtrl($scope, $modal, data) {
        $scope.data = data;
        $scope.open = function() {

            var modalInstance = $modal.open({
                templateUrl: '/templates/modal.html',
                controller: 'ModalInstanceCtrl',
            });
        }
    }

    angular
        .module('chatter')
        .controller('PopupCtrl', ['$scope', '$modal', 'Room', PopupCtrl])
})();
