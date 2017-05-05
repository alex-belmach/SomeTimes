(function() {
    'use strict';

    angular
        .module('app')
        .directive('selectSection', selectSection);

    function selectSection() {
        return {
            restrict: 'E',
            scope: {
                showSection: '=',
                showSectionNews: '='
            },
            templateUrl: '/components/selectSection/selectSection.tmpl.html',
            controller: 'selectSectionCtrl'
        };
    }
})();
