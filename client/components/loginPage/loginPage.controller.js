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
        var ERRORS = {
            common: 'Please double check your entries',
            fill: 'Please fill both username and password'
        };

        $scope.showErrorNote = false;

        $scope.localLogin = function() {
            if ($scope.login_form.$invalid) {
                $scope.error = ERRORS.fill;
                $scope.showErrorNote = true;
                return;
            }
            loginService.signIn($scope.username, $scope.password)
            .then(function(response) {
                if(response.status === 202) {
                    $scope.showErrorNote = false;
                    $location.url('/');
                }
            },
            function(response) {
                $scope.error = ERRORS.common;
                $scope.showErrorNote = true;
            });
        };
    }
})();
