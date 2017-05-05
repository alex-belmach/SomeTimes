app.service('newsService', ['$http', '$q', 'newsApiService', 'utilityService', 'CONSTANTS',
function($http, $q, newsApiService, utilityService, CONSTANTS) {
    var sectionList = [];

    return {
        getSectionList: getSectionList,
        getSectionNews: getSectionNews
    };

    function getSectionList() {
        if (sectionList.length) {
            var deferred = $q.defer();
            deferred.resolve(sectionList);
            return deferred.promise;
        }
        return $http.get(CONSTANTS.sectionsListPath, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(function(response) {
            sectionList = response.data.sections;
            return sectionList;
        });
    }

    function getSectionNews(selectedSection) {
        return newsApiService.getSectionSources(selectedSection)
            .then(getSectionArticles)
            .then(toLocalDate)
            .then(utilityService.sortByLatest)
            .then(function(articles) {
                return articles;
            });
    }

    function getSectionArticles(sectionSources) {
        var articles = [],
            requests = [];
        _.forEach(sectionSources, function(source) {
            requests.push(newsApiService.getArticlesBySourceId(source.id)
                .then(function(sourceArticles) {
                    articles = _.concat(articles, sourceArticles);
                }));
        });
        return $q.all(requests).then(function() {
            return articles;
        });
    }

    function toLocalDate(articles) {
        _.forEach(articles, function(article) {
            article.publishedAt = new Date(article.publishedAt);
        });
        return articles;
    }
}]);
