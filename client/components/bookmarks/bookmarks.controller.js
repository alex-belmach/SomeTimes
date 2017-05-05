app.controller('bookmarksCtrl', ['$scope', 'bookmarkService', function($scope, bookmarkService) {
    $scope.$watch('isDisplayed', function() {
        if ($scope.isDisplayed) {
            bookmarkService.getBookmarks()
                .then(updateBookmarkList);
        }
    });

    function updateBookmarkList(bookmarks) {
        $scope.bookmarkArticles = bookmarks;
        $scope.updateList = true;
        updateView();
    }

    function updateView() {
        $scope.showList = $scope.bookmarkArticles.length > 0;
        $scope.showNoBookmarks = !$scope.showHeading;
    }
}]);
