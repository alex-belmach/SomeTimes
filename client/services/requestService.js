app.service('requestService', ['$http', function($http) {
    return {
        get: (url) => { return $http.get(url); }
    };
}]);
