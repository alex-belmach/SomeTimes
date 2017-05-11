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
        var ERRORS = {
            exists: 'User already exists',
            fill: 'Please fill all fields',
            email: 'Please enter valid email',
            password: 'Please fill the same password'
        };

        $scope.showErrorNote = false;

        $scope.makeRequest = function() {
            if (!validate()) {
                return;
            }

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
                    $scope.error = ERRORS.exists;
                    $scope.showErrorNote = true;
                }
            });
        };

        function validate() {
            if ($scope.register_form.$error.required) {
                $scope.error = ERRORS.fill;
                $scope.showErrorNote = true;
                return false;
            }
            if ($scope.register_form.$error.email) {
                $scope.error = ERRORS.email;
                $scope.showErrorNote = true;
                return false;
            }
            if ($scope.password !== $scope.password2) {
                $scope.error = ERRORS.password;
                $scope.showErrorNote = true;
                return false;
            }
            $scope.showErrorNote = false;
            return true;
        }
    }
})();
