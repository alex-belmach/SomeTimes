app.controller('newsListCtrl', ['$scope', 'loginService', 'utilityService', 'bookmarkService',
function($scope, loginService, utilityService, bookmarkService) {
    var ARTICLES_DEFAULT_LIMIT = 7;

    $scope.addToBookmarks = function (article, event) {
        bookmarkService.addBookmark(article);

        highlightOnAdd(event.target);
        toggleBookmarkIcon(article);
    };

    $scope.$watch('updateNewsList', function() {
        if ($scope.updateNewsList) {
            $scope.articlesLimit = ARTICLES_DEFAULT_LIMIT;
            $scope.showBookmarkButton = loginService.isLoggedIn();
            updateArticlesData(0, $scope.articlesLimit - 1);
            $scope.updateNewsList = false;
        }
    });

    $scope.increaseLimit = function() {
        var newLimit = $scope.articlesLimit + ARTICLES_DEFAULT_LIMIT;
        updateArticlesData($scope.articlesLimit, newLimit - 1);
        $scope.articlesLimit = newLimit;
    };

    function updateArticlesData(firstIndex, lastIndex) {
        lastIndex = _.min([lastIndex, $scope.articles.length - 1]);
        var bookmarkCheckArray = [];
        for (var i = firstIndex; i <= lastIndex; i++) {
            var article = $scope.articles[i];
            beautifyPublishDate(article);
            beautifySourceHost(article);
            beautifyAuthorName(article);
            bookmarkCheckArray.push(article);
        }
        checkBookmarks(bookmarkCheckArray);
    }

    function checkBookmarks(bookmarkCheckArray) {
        if (!$scope.showBookmarkButton) {
            return;
        }
        var urlsArray = _.map(bookmarkCheckArray, function(article) {
            return article.url;
        });

        bookmarkService.checkIfExists(urlsArray)
            .then(function(ifExistsArray) {
                beautifyBookmarks(bookmarkCheckArray, ifExistsArray);
            });
    }

    function beautifyBookmarks(articles, ifExistsArray) {
        _.forEach(articles, function(article, index) {
            article.bookmarkIcon = ifExistsArray[index] ? '/resources/min/bookmark_marked.png'
                                                        : '/resources/min/bookmark.png';
        });
    }

    function beautifyPublishDate(article) {
        article.publishedAtString = article.publishedAt.toDateString();
    }

    function beautifySourceHost(article) {
        article.hostName = utilityService.getHostName(article.url);
    }

    function beautifyAuthorName(article) {
        if (article.author && !_.startsWith(article.author.toLowerCase(), 'by')) {
            article.author = 'by ' + article.author;
        }
    }

    function highlightOnAdd(element) {
        $(element).addClass("bookmark_add_response");
        setTimeout(function() {
            $(element).removeClass("bookmark_add_response");
        }, 1000);
    }

    function toggleBookmarkIcon(article) {
        article.bookmarkIcon = article.bookmarkIcon === '/resources/min/bookmark_marked.png'
                               ? '/resources/min/bookmark.png'
                               : '/resources/min/bookmark_marked.png';
    }
}]);
