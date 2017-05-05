(function() {
    'use strict';

    angular
        .module('app')
        .directive('newsList', newsList);

    function newsList() {
        return {
            restrict: 'E',
            scope: {
                articles: '=',
                isDisplayed: '=',
                updateNewsList: '=',
                isBookmarkList: '=?'
            },
            templateUrl: '/components/newsList/newsList.tmpl.html',
            controller: 'newsListCtrl',
            link: function(scope) {
                scope.isBookmarkList = scope.isBookmarkList || false;
            }
        };
    }
})();
