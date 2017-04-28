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
        currentSection: true,
        sectionsList: true,
        bookmarks: true,
        spinnerGIF: true,
        spinnerCSS: true,
        userInfo: true,
        noBookmarksMsg: false,
        bookmarksHeading: true
    };

    $scope.hideSpinner = (hide, browser = navigator.userAgent) => {
        if(isIEService.detect(browser)) {
            $scope.hide.spinnerGIF = hide;
        }
        else {
            $scope.hide.spinnerCSS = hide;
        }
    };

    let jsonPromise = requestService.get(CONSTANTS.dataPath);
    jsonPromise.then(function (response) {
        $scope.sections = response.data.sections;
        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);
    });

    $scope.chooseSection = (currentSection = 'Show all sections...') => {
        $(".select_button").blur();
        $scope.hideSpinner(false);
        $scope.hide.bookmarks = true;

        if (currentSection === 'Show all sections...') {
            $scope.hideSpinner(true);
            $scope.hide.currentSection = true;
            $scope.hide.sectionsList = false;
            $(".logo").addClass("logo_top");
        }
        else {
            $scope.hide.currentSection = false;
            $scope.hide.sectionsList = true;
            $scope.url = CONSTANTS.articlesUrl + '?' + $.param({
                'api-key': CONSTANTS.apiKey,
                'fq': `news_desk:("${currentSection}")`
            });

            let promise = requestService.get($scope.url);
            promise.then(function (response) {
                $scope.hideSpinner(true);
                $scope.articles = response.data.response.docs;
                $scope.articles.forEach(function (current, index) {
                    if (current.multimedia.length) {
                        current.gallery = (`${CONSTANTS.commonUrl}${current.multimedia[0].url}`);
                        current.hideImage = false;
                    }
                    else {
                        current.hideImage = true;
                    }
                    current.date = `${current.pub_date.slice(0, 10)}`;
                    current.author = (current.byline && current.byline.original) ? `${current.byline.original}` : ``;

                    if(loginService.loginInfo.isLogin === true) {
                        let data = {
                            username: loginService.getUsername(),
                            title: current.headline.main
                        };

                        $http({
                            url: '/checkIfExists',
                            method: "POST",
                            data: { article : data }
                        })
                        .then(function(response) {
                            if(response.data === "Data is already exists") {
                                current.bookmark = "./resources/min/bookmark_marked.png";
                            }
                            else {
                                current.bookmark = "./resources/min/bookmark.png";
                            }
                        },
                        function(response) {
                        });
                    }
                });
                $scope.hideSpinner(true);
                $(".logo").addClass("logo_top");
            });
        }
    };

    $scope.checkIfExists = (article) => {
        let data = {
            username: loginService.getUsername(),
            title: article.headline.main
        };

        $scope.isExists = false;

        $http({
            url: '/checkIfExists',
            method: "POST",
            data: { article : data}
        })
        .then(function(response) {
            if(response.data === "Data is already exists") {
                console.log("exists");
                $scope.isExists = true;
            }
            else {
                console.log("not exists");
                $scope.isExists = false;
            }
        },
        function(response) {
        });
    };

    $scope.showBookmarks = () => {
        $scope.hide.currentSection = true;
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

    $scope.hideAll = () => {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $scope.hide.bookmarks = true;
        $(".logo").removeClass("logo_top");
    };

    $scope.addToBookmarks = (article) => {
        let data = {
            username: loginService.getUsername(),
            web_url: article.web_url,
            gallery: article.gallery,
            date: article.date,
            author: article.author,
            title: article.headline.main,
            lead_paragraph: article.lead_paragraph
        };

        $http({
            url: '/addToBookmarks',
            method: "POST",
            data: { article : data}
        })
        .then(function(response) {
            if(response.status === "203") {

            }
        },
        function(response) {
        });

        $(".more_info").addClass("bookmark_add_response");
        setTimeout(function() {
            $(".more_info").removeClass("bookmark_add_response");
        }, 400);
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
