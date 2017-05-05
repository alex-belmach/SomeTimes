app.directive('bookmarks', function () {
    return {
        restrict: 'E',
        scope: {
            isDisplayed: '='
        },
        templateUrl: '/components/bookmarks/bookmarks.tmpl.html',
        controller: 'bookmarksCtrl'
    };
});
