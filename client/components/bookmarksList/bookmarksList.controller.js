(function() {
    'use strict';

    bookmarksListCtrl.$inject = [
        '$scope',
        'bookmarkService'
    ];

    angular
        .module('app')
        .controller('bookmarksListCtrl', bookmarksListCtrl);

    function bookmarksListCtrl(
        $scope,
        bookmarkService
    ) {
        $scope.$watch('isDisplayed', function() {
            if ($scope.isDisplayed) {
                fetchAllBookmarks();
            }
        });

        function fetchAllBookmarks() {
            bookmarkService.getBookmarks()
                .then(updateBookmarkList);
        }

        function updateBookmarkList(bookmarks) {
            $scope.bookmarkArticles = bookmarks;
            $scope.updateList = true;
        }
    }
})();
