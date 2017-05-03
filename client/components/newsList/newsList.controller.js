app.controller('newsListCtrl', ['$scope', 'loginService', 'utilityService',
function($scope, loginService, utilityService) {
    var ARTICLES_DEFAULT_LIMIT = 7;

    $scope.showBookmarkButton = loginService.isLoggedIn();

    $scope.$watch('updateNewsList', function() {
        if ($scope.updateNewsList) {
            $scope.articlesLimit = ARTICLES_DEFAULT_LIMIT;
            beautifyArticlesData(0, $scope.articlesLimit - 1);
            $scope.updateNewsList = false;
        }
    });

    $scope.increaseLimit = function() {
        var newLimit = $scope.articlesLimit + ARTICLES_DEFAULT_LIMIT;
        beautifyArticlesData($scope.articlesLimit, newLimit - 1);
        $scope.articlesLimit = newLimit;
    };

    function beautifyArticlesData(firstIndex, lastIndex) {
        lastIndex = _.min([lastIndex, $scope.articles.length - 1]);
        for (var i = firstIndex; i <= lastIndex; i++) {
            var article = $scope.articles[i];
            beautifyPublishDate(article);
            beautifySourceHost(article);
        }
    }

    function beautifyPublishDate(article) {
        article.publishedAtString = article.publishedAt.toDateString();
    }

    function beautifySourceHost(article) {
        article.hostName = utilityService.getHostName(article.url);
    }
}]);
