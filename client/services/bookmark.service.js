app.service('bookmarkService', ['$http', 'loginService', function($http, loginService) {
    return {
        checkIfExists: checkIfExists,
        addBookmark: addBookmark
    };

    function checkIfExists(urlsArray) {
        return $http({
            method: 'POST',
            url: '/checkIfExists/' + loginService.getUsername(),
            data: { urls : urlsArray }
        })
        .then(function(response) {
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Error during checkIfExists');
            }
        });
    }

    function addBookmark(article) {
        let data = {
            username: loginService.getUsername(),
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            author: article.author,
            title: article.title,
            description: article.description,
            hostName: article.hostName
        };

        return $http({
            method: 'POST',
            url: '/addToBookmarks',
            data: { article : data }
        })
        .then(function(response) {
            if(response.status !== 202) {
                throw new Error('Error during adding to bookmark');
            }
        });
    }
}]);
