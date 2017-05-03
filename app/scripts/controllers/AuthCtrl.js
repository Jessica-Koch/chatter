(function () {
    function AuthCtrl ($scope, $state, Auth) {
        this.auth = Auth;

        this.user = {
            email: '',
            password: ''
        };

        /**
         * Authenticates a user with email & password
         * @return {[type]} [description]
         */
        $scope.login = function () {
            this.auth.$signInWithEmailAndPassword(this.user.email, this.user.password).then(function(auth) {
                $state.go('home');
            }, function (error) {
                this.error = error;
            });
        }

        /**
         * Registers a user to the application
         */
        $scope.register = function () {
            this.auth.$createUserWithEmailAndPassword(this.user.email, this.user.password).then(function(user) {
                $state.go('home')
            }, function(error){
                AuthCtrl.error = error;
            })
        }
    }

    angular
        .module('chatter')
        .controller('AuthCtrl', ['$scope', '$state', 'Auth', AuthCtrl]);
})();
