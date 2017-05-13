(function() {
    'use strict';

    angular
        .module('app')
        .directive('validatePassword', validatePassword);

    function validatePassword() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$validators.password = function(modelValue, viewValue) {
                    var value = modelValue || viewValue,
                        passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                    return value && value.match(passwordRegex);
                };
            }
        };
    }
})();
