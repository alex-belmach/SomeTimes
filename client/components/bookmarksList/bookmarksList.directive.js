(function() {
    'use strict';

    angular
        .module('app')
        .directive('bookmarksList', bookmarksList);

    function bookmarksList() {
        return {
            restrict: 'E',
            scope: {
                isDisplayed: '='
            },
            templateUrl: '/components/bookmarksList/bookmarksList.tmpl.html',
            controller: 'bookmarksListCtrl'
        };
    }
})();
