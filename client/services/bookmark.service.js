app.service('bookmarkService', ['$http', 'loginService', function($http, loginService) {
    return {
        checkIfExists: checkIfExists,
        addBookmark: addBookmark,
        removeBookmark: removeBookmark
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

        // TODO: move this logic to bookmarks page
        // let index = 0;
        // for(let i = 0; i < $scope.articles.length; i++) {
        //     if($scope.articles[i].title === article.title) {
        //         index = i;
        //         break;
        //     }
        // }
        //
        // $(".more_info").addClass("bookmark_delete_response");
        // $timeout(function() {
        //     $(".more_info").removeClass("bookmark_delete_response");
        //     $scope.articles.splice(index, 1);
        //     if($scope.articles.length === 0) {
        //         $scope.hide.noBookmarksMsg = false;
        //         $scope.hide.bookmarksHeading = true;
        //     }
        //     else {
        //         $scope.hide.noBookmarksMsg = true;
        //         $scope.hide.bookmarksHeading = false;
        //     }
        // }, 400);
    }
}]);
