(function() {
    'use strict';

    angular
        .module('app')
        .directive('recommendedNews', recommendedNews);

    function recommendedNews() {
        return {
            restrict: 'E',
            scope: {
                loggedIn: '='
            },
            templateUrl: '/components/recommendedNews/recommendedNews.tmpl.html',
            controller: 'recommendedNewsCtrl'
        };
    }
})();
