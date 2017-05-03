app.controller('selectSectionCtrl', ['$scope', 'newsService', function($scope, newsService) {
    newsService.getSectionList().then(function (sectionList) {
        var allSections = { name: '', niceName: 'All News' };
        $scope.sectionList = _.concat(sectionList, allSections);
    });

    $scope.chooseSection = function() {
        $("#get_news_button").blur();
        $scope.showSection([
            { name: 'spinner', isShow: true },
            { name: 'bookmarks', isShow: false },
            { name: 'sectionNews', isShow: true }
        ]);

        newsService.getSectionNews($scope.currentSection.name)
            .then(function(articles) {
                console.log(articles);
            });

        // let promise = requestService.get($scope.url);
        // promise.then(function (response) {
        //     $scope.hideSpinner(true);
        //     $scope.articles = response.data.response.docs;
        //     $scope.articles.forEach(function (current, index) {
        //         if (current.multimedia.length) {
        //             current.gallery = (`${CONSTANTS.commonUrl}${current.multimedia[0].url}`);
        //             current.hideImage = false;
        //         }
        //         else {
        //             current.hideImage = true;
        //         }
        //         current.date = `${current.pub_date.slice(0, 10)}`;
        //         current.author = (current.byline && current.byline.original) ? `${current.byline.original}` : ``;
        //
        //         if(loginService.loginInfo.isLogin === true) {
        //             let data = {
        //                 username: loginService.getUsername(),
        //                 title: current.headline.main
        //             };
        //
        //             $http({
        //                 url: '/checkIfExists',
        //                 method: "POST",
        //                 data: { article : data }
        //             })
        //             .then(function(response) {
        //                 if(response.data === "Data is already exists") {
        //                     current.bookmark = "./resources/min/bookmark_marked.png";
        //                 }
        //                 else {
        //                     current.bookmark = "./resources/min/bookmark.png";
        //                 }
        //             },
        //             function(response) {
        //             });
        //         }
        //     });
        //     $scope.hideSpinner(true);
        //     $(".logo").addClass("logo_top");
        // });
    };
}]);
