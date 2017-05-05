(function() {
    function CookieAuthCtrl($scope, $cookies, $modalInstance) {
        $scope.user = {};
        $scope.cancel = function () {
            modalInstance.dismiss('cancel');
        }

        $scope.submitForm = function(isValid) {
            $scope.submitted = true;
            if(isValid) {
                $modalInstance.close('closed');
                $cookies.username = $scope.user.username;
            } else {
                console.log('WRONG')
            }
        };
    }
    angular
        .module('chatter')
        .controller('CookieAuthCtrl', ['$scope', '$cookies', '$modalInstance' ,CookieAuthCtrl])
})();
