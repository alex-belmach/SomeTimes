(function() {
    'use strict';

    loginPageCtrl.$inject = [
        '$scope',
        '$location',
        'loginService'
    ];

    angular
        .module('app')
        .controller('loginPageCtrl', loginPageCtrl);

    function loginPageCtrl(
        $scope,
        $location,
        loginService
    ) {
        $scope.showErrorNote = false;

        $scope.localLogin = function() {
            loginService.signIn($scope.username, $scope.password)
            .then(function(response) {
                if(response.status === 202) {
                    $scope.showErrorNote = false;
                    $location.url('/');
                }
            },
            function(response) {
                $scope.showErrorNote = true;
            });
        };
    }
})();
