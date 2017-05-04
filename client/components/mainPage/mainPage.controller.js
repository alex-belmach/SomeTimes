app.controller('MainPageCtrl', ['$scope',
                                 '$http',
                                 '$timeout',
                                 '$location',
                                 '$route',
                                 'requestService',
                                 'CONSTANTS',
                                 'isIEService',
                                 'loginService',
                                 ($scope, $http, $timeout, $location, $route, requestService, CONSTANTS, isIEService, loginService) => {
    $scope.hide = {
        sectionNews: true,
        bookmarks: true,
        spinnerGIF: true,
        spinnerCSS: true,
        userInfo: true,
        noBookmarksMsg: false,
        bookmarksHeading: true
    };

    $scope.showSection = function(section, isShow) {
        if (_.isArray(section)) {
            _.forEach(section, function(showSectionObj) {
                showOneSection(showSectionObj.name, showSectionObj.isShow);
            });
        } else {
            showOneSection(section, isShow);
        }
    };

    function showOneSection(sectionName, isShow) {
        if (sectionName === 'spinner') {
            hideSpinner(!isShow);
            return;
        }
        $scope.hide[sectionName] = !isShow;
    }

    function hideSpinner(hide) {
        if(isIEService.detect()) {
            $scope.hide.spinnerGIF = hide;
        } else {
            $scope.hide.spinnerCSS = hide;
        }
    }

    $scope.showSectionNews = function(articles) {
        $scope.sectionArticles = articles;
        $scope.showSection('sectionNews', true);
        $scope.updateNewsList = true;
        $(".logo").addClass("logo_top");
    };

    $scope.hideAll = () => {
        $scope.showSection([
            { name: 'sectionNews', isShow: false },
            { name: 'sectionList', isShow: false },
            { name: 'bookmarks', isShow: false }
        ]);
        $(".logo").removeClass("logo_top");
    };







    $scope.showBookmarks = () => {
        $scope.hide.sectionNews = true;
        $scope.hide.sectionsList = true;
        $scope.hide.bookmarks = false;
        $(".logo").addClass("logo_top");

        let url = '/getBookmarks' + '/' + loginService.getUsername();

        $http({
            url: url,
            method: "GET"
        })
        .then(function(response) {
            $scope.articles = response.data.bookmarks;
            if($scope.articles.length === 0) {
                $scope.hide.noBookmarksMsg = false;
                $scope.hide.bookmarksHeading = true;
            }
            else {
                $scope.hide.noBookmarksMsg = true;
                $scope.hide.bookmarksHeading = false;
            }
            $scope.articles.forEach(function (current, index) {
                if (current.gallery) {
                    current.hideImage = false;
                }
                else {
                    current.hideImage = true;
                }
            });
        },
        function(response) {
        });

        $scope.toTop();
    };

    $scope.toTop = () => {
        $('html,body').scrollTop(0);
    };

    $scope.deleteFromBookmarks = (article) => {
        let data = {
            username: loginService.getUsername,
            title: article.title
        };

        $http({
            url: '/deleteFromBookmarks',
            method: "POST",
            data: { article : data}
        })
        .then(function(response) {
        },
        function(response) {
        });

        let index = 0;
        for(let i = 0; i < $scope.articles.length; i++) {
            if($scope.articles[i].title === article.title) {
                index = i;
                break;
            }
        }

        $(".more_info").addClass("bookmark_delete_response");
        $timeout(function() {
            $(".more_info").removeClass("bookmark_delete_response");
            $scope.articles.splice(index, 1);
            if($scope.articles.length === 0) {
                $scope.hide.noBookmarksMsg = false;
                $scope.hide.bookmarksHeading = true;
            }
            else {
                $scope.hide.noBookmarksMsg = true;
                $scope.hide.bookmarksHeading = false;
            }
        }, 400);
    };
}]);
