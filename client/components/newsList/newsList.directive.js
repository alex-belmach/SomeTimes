app.directive('newsList', function () {
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
});
