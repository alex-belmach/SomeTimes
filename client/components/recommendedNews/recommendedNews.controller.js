(function() {
    'use strict';

    recommendedNewsCtrl.$inject = [
        '$scope',
        '$interval',
        'analysisService',
        'recommendedNewsApiService'
    ];

    angular
        .module('app')
        .controller('recommendedNewsCtrl', recommendedNewsCtrl);

    function recommendedNewsCtrl(
        $scope,
        $interval,
        analysisService,
        recommendedNewsApiService
    ) {
        var keyWords,
            currentIndex,
            recommendedArticles = [],
            UPDATE_RECOMMENDED_LIST_INTERVAL = 300000,
            CHANGE_CURRENT_ARTICLE_INTERVAL = 10000;

        $interval(updateRecommendedList, UPDATE_RECOMMENDED_LIST_INTERVAL);
        $interval(updateCurrentArticle, CHANGE_CURRENT_ARTICLE_INTERVAL);

        updateRecommendedList();

        $scope.$watch('loggedIn', function() {
            if ($scope.loggedIn) {
                fetchKeyWordsList();
            }
        });

        function updateRecommendedList() {
            return fetchKeyWordsList().then(function() {
                if (keyWords.length) {
                    recommendedNewsApiService.getArticles(keyWords)
                        .then(sanitizeArticles)
                        .then(saveArticlesList)
                        .then(updateCurrentArticle);
                }
            });
        }

        function updateCurrentArticle() {
            if (recommendedArticles && recommendedArticles.length) {
                $scope.currentArticle = _.cloneDeep(recommendedArticles[currentIndex]);
                currentIndex = currentIndex + 1 === recommendedArticles.length ? 0 : currentIndex + 1;
            } else {
                updateRecommendedList();
            }
        }

        function sanitizeArticles(articlesList) {
            currentIndex = 0;
            return _.map(articlesList, function(article) {
                return {
                    title: article.thread.title,
                    imageUrl: article.thread.main_image,
                    url: article.thread.url,
                    description: article.text
                };
            });
        }

        function saveArticlesList(articlesList) {
            recommendedArticles = _.cloneDeep(articlesList);
        }

        function fetchKeyWordsList() {
            return analysisService.getKeyWords().then(function(keyWordsList) {
                keyWords = _.cloneDeep(keyWordsList);
            });
        }
    }
})();
