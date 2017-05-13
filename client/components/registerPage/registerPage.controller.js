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
            required: 'Please fill all fields',
            usernameLength: 'Username must contain from 4 to 14 symbols',
            username: 'Username must contain only symbols a-z A-Z 0-9',
            exists: 'User already exists',
            email: 'Please enter valid email',
            password: 'Password must containt 6-20 symbols a-z A-Z 0-9',
            password2: 'Please fill the same password'
        };

        $scope.showErrorNote = false;

        $scope.makeRequest = function() {
            if (!validate()) {
                $scope.showErrorNote = true;
                return;
            }

            $scope.showErrorNote = false;

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

        function checkRule(rule) {
            if ($scope.register_form.$error[rule]) {
                $scope.error = ERRORS[rule];
                return false;
            }
            return true;
        }

        function checkPassword() {
            if ($scope.password !== $scope.password2) {
                $scope.error = ERRORS[password2];
                $scope.showErrorNote = true;
                return false;
            }
            return true;
        }

        function validate() {
            return checkRule('required') && checkRule('usernameLength') && checkRule('username')
                    && checkRule('email') && checkRule('password') && checkPassword();
        }
    }
})();
