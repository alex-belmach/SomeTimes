app.directive('newsList', function () {
    return {
        restrict: 'E',
        scope: {
            articles: '=',
            isDisplayed: '=',
            updateNewsList: '='
        },
        templateUrl: '/components/newsList/newsList.tmpl.html',
        controller: 'newsListCtrl'
    };
});
