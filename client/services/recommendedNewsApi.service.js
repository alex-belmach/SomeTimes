(function() {
    'use strict';

    recommendedNewsApiService.$inject = [
        '$http',
        '$q',
        'CONSTANTS'
    ];

    angular
        .module('app')
        .service('recommendedNewsApiService', recommendedNewsApiService);

    function recommendedNewsApiService(
        $http,
        $q,
        CONSTANTS
    ) {
        var TWO_DAYS = 1494095762288;

        return {
            getArticles: getArticles
        };

        function getArticles(keyWords) {
            var keyWordsArray = _.map(keyWords, function(keyWordObj) {
                    return keyWordObj.word;
                }),
                keyWordsString = '(' + _.join(keyWordsArray, ' OR ') + ')',
                queryString = keyWordsString + ' language:(english) (site_type:news)';

            return $http({
                method: 'GET',
                url: CONSTANTS.webhoseApi.baseUrl,
                params: {
                    token: CONSTANTS.webhoseApi.apiKey,
                    format: 'json',
                    q: queryString,
                    sort: 'relevancy',
                    ts: TWO_DAYS
                }
            }).then(function(response) {
                if (response.status !== 200) {
                    throw new Error('Error while fetching recommended news');
                }
                return response.data.posts;
            });
        }
    }
})();
