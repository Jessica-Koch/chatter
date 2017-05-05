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
    }
    function CookieAuth($cookies, $modal ) {
        var currentUser = $cookies.get('chatterCurrentUser');
        if (!currentUser | currentUser === '') {

            $modal.open({
                controller: 'CookieAuthCtrl',
                templateUrl: 'templates/cookieModal.html',
                backdrop: 'static',
                keyboard: false,
            });
        }
    }

    angular
        .module('chatter', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies'])
        .config(config)
        .run(['$cookies', '$modal', CookieAuth])
})();
