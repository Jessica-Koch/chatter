(function () {
    function Auth($firebaseAuth) {
        var authentication = $firebaseAuth();

        Auth.auth = authentication;
        
        return Auth;
    }

    angular
        .module('chatter')
        .factory('Auth', ['$firebaseAuth', Auth]);
})();
