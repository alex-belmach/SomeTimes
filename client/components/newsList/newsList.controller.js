(function() {
    'use strict';

    newsListCtrl.$inject = [
        '$scope',
        '$timeout',
        'loginService',
        'utilityService',
        'bookmarkService',
        'analysisService'
    ];

    angular
        .module('app')
        .controller('newsListCtrl', newsListCtrl);

    function newsListCtrl(
        $scope,
        $timeout,
        loginService,
        utilityService,
        bookmarkService,
        analysisService
    ) {
        var ARTICLES_DEFAULT_LIMIT = 12;

        $scope.toggleBookmark = function(article, event) {
            var element = $(event.target);

            if (isBookmark(article)) {
                removeFromBookmarks(article, element);
            } else {
                addToBookmarks(article, element);
            }
            toggleBookmarkIcon(article, element);
        };

        $scope.analyseArticle = function(article) {
            analysisService.addArticle(article);
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
            if ($scope.isBookmarkList) {
                markBookmarks(firstIndex, lastIndex);
            } else {
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

        function markBookmarks(firstIndex, lastIndex) {
            if (_.isUndefined(lastIndex)) {
                markOneBookmark(firstIndex);
                return;
            }
            for (var i = firstIndex; i <= lastIndex; i++) {
                if (!markOneBookmark(i)) {
                    return;
                }
            }
        }

        function markOneBookmark(index) {
            var article = $scope.articles[index];
            if (!_.isUndefined(article)) {
                article.bookmarkIcon = '/resources/min/bookmark_marked.png';
                return true;
            }
            return false;
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
            element.addClass('bookmark_add_response');
            $timeout(function() {
                element.removeClass('bookmark_add_response');
            }, 500);
        }

        function highlightOnRemove(element) {
            element.addClass('bookmark_delete_response');
            $timeout(function() {
                element.removeClass('bookmark_delete_response');
            }, 500);
        }

        function removeFromBookmarks(article, element) {
            bookmarkService.removeBookmark(article);

            highlightOnRemove(element);
            if ($scope.isBookmarkList) {
                markBookmarks(ARTICLES_DEFAULT_LIMIT);
                $timeout(function() {
                    _.pull($scope.articles, article);
                }, 501);
            }
        }

        function addToBookmarks(article, element) {
            bookmarkService.addBookmark(article);

            highlightOnAdd(element);
        }

        function toggleBookmarkIcon(article, element) {
            article.bookmarkIcon = article.bookmarkIcon === '/resources/min/bookmark_marked.png'
                                   ? '/resources/min/bookmark.png'
                                   : '/resources/min/bookmark_marked.png';
        }

        function isBookmark(article) {
            return article.bookmarkIcon === '/resources/min/bookmark_marked.png';
        }
    }
})();
