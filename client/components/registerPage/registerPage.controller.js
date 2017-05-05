(function() {
    'use strict';

    registerPageCtrl.$inject = [
        '$scope',
        '$location',
        'loginService'
    ];

    angular
        .module('app')
        .controller('registerPageCtrl', registerPageCtrl);

    function registerPageCtrl(
        $scope,
        $location,
        loginService
    ) {
        $scope.showErrorNote = false;

        $scope.makeRequest = () => {
            var userData = {
                name: $scope.name,
                email: $scope.email,
                username: $scope.username,
                password: $scope.password,
                password2: $scope.password2
            };

            loginService.signUp(userData)
            .then(function(response) {
                $scope.showErrorNote = false;
                $location.path('login');
            },
            function(response) {
                if(response.status === 401) {
                    $scope.showErrorNote = true;
                }
            });
        };
    }
})();
