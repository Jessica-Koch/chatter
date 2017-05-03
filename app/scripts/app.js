(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({enabled: true, requireBase: false});

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl as home',
                templateUrl: '/templates/home.html'
            })
            .state('login', {
                url: '/login',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: '/templates/login.html'
            })
            .state('register', {
                url: '/register',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: '/templates/register.html'
            })
    }
    angular
        .module('chatter', ['ui.router', 'firebase', 'ui.bootstrap'])
        .config(config);
})();
