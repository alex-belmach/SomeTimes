app.service('newsApiService', ['$http', '$q', 'CONSTANTS', function($http, $q, CONSTANTS) {
    var newsSources = [];

    return {
        getSectionSources: getSectionSources,
        getArticlesBySourceId: getArticlesBySourceId
    };

    function getSectionSources(section) {
        return getAllNewsSources()
                .then(function(newsSources) {
                    return filterSection(newsSources, section);
                });
    }

    function getAllNewsSources() {
        if (newsSources.length) {
            var deferred = $q.defer();
            deferred.resolve(newsSources);
            return deferred.promise;
        }
        return $http({
            method: 'GET',
            url: CONSTANTS.newsApi.baseUrl + '/sources',
            params: { language: 'en' }
        }).then(function(response) {
            if (response.data.status === 'ok') {
                newsSources = response.data.sources;
                return newsSources;
            } else {
                throw new Error('Error during fetching all sources');
            }
        });
    }

    function filterSection(sectionList, section) {
        return (section === '') ? sectionList : _.filter(sectionList, { category: section });
    }

    function getArticlesBySourceId(sourceId) {
        return $http({
            method: 'GET',
            url: CONSTANTS.newsApi.baseUrl + '/articles',
            params: { source: sourceId, apiKey: CONSTANTS.newsApi.apiKey }
        }).then(function(response) {
            if (!_.isUndefined(response.data.status) && response.data.status === 'ok') {
                return response.data.articles;
            } else {
                throw new Error('Error during fetching articles for ' + sourceId);
            }
        });
    }
}]);
