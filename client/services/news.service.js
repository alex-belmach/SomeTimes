app.service('newsService', ['$http', '$q', 'CONSTANTS', function($http, $q, CONSTANTS) {
    var sectionList = [];

    return {
        getSectionList: getSectionList
    };

    function getSectionList() {
        if (sectionList.length) {
            return $q.resolve({ data:sectionList });
        }
        return $http.get(CONSTANTS.sectionsListPath, {
            headers: {
                'Content-type': 'application/json'
            }
        });
    }
}]);
