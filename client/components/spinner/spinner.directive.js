(function() {
    'use strict';

    angular
        .module('app')
        .directive('spinner', spinner);

    function spinner() {
        return {
            restrict: 'E',
            scope: {
                hideGif: '=',
                hideCss: '='
            },
            templateUrl: '/components/spinner/spinner.tmpl.html'
        };
    }
})();
