(function() {
    'use strict';

    angular
        .module('app')
        .directive('validateUsername', validateUsername);

    function validateUsername() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$validators.usernameLength = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return value && value.length > 3 && value.length < 15;
                };

                ngModelCtrl.$validators.username = function(modelValue, viewValue) {
                    var value = modelValue || viewValue,
                        usernameRegex = /^[a-zA-Z0-9]+$/;
                    return value && value.match(usernameRegex);
                };
            }
        };
    }
})();
