(function() {
    'use strict';

    bookmarkService.$inject = [
        '$http',
        'loginService'
    ];

    angular
        .module('app')
        .service('bookmarkService', bookmarkService);

    function bookmarkService(
        $http,
        loginService
    ) {
        return {
            checkIfExists: checkIfExists,
            addBookmark: addBookmark,
            removeBookmark: removeBookmark,
            getBookmarks: getBookmarks
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
                    throw new Error('Error during adding to bookmarks');
                }
            });
        }

        function removeBookmark(article) {
            let data = {
                username: loginService.getUsername(),
                url: article.url
            };

            return $http({
                method: 'POST',
                url: '/deleteFromBookmarks',
                data: { article : data }
            }).then(function(response) {
                if(response.status !== 202) {
                    throw new Error('Error during deleting from bookmarks');
                }
            });
        }

        function getBookmarks() {
            let url = '/getBookmarks/' + loginService.getUsername();

            return $http({
                method: 'GET',
                url: url
            })
            .then(function(response) {
                if (response.status !== 202) {
                    throw new Error('Error during getting bookmarks');
                }
                return _.reverse(response.data.bookmarks);
            });
        }
    }
})();
