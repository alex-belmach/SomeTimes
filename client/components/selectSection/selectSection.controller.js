app.controller('selectSectionCtrl', ['$scope', 'newsService', function($scope, newsService) {
    newsService.getSectionList().then(function (sectionList) {
        var allSections = { name: '', niceName: 'All News' };
        $scope.sectionList = _.concat(sectionList, allSections);
    });

    $scope.chooseSection = function() {
        $("#get_news_button").blur();
        $scope.showSection([
            { name: 'spinner', isShow: true },
            { name: 'bookmarks', isShow: false }
        ]);

        newsService.getSectionNews($scope.currentSection.name)
            .then(function(articles) {

                $scope.showSection('spinner', false);
                $scope.showSectionNews(articles);
                console.log(articles);
            });
    };
}]);
