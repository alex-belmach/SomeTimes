(function() {
    'use strict';

    mainPageCtrl.$inject = [
        '$scope',
        'isIEService',
        'utilityService'
    ];

    angular
        .module('app')
        .controller('mainPageCtrl', mainPageCtrl);

    function mainPageCtrl(
        $scope,
        isIEService,
        utilityService
    ) {
        $scope.hide = {
            sectionNews: true,
            bookmarks: true,
            spinnerGIF: true,
            spinnerCSS: true,
            userInfo: true
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

        $scope.hideAll = function() {
            $scope.showSection([
                { name: 'sectionNews', isShow: false },
                { name: 'sectionList', isShow: false },
                { name: 'bookmarks', isShow: false }
            ]);
            $(".logo").removeClass("logo_top");
        };

        $scope.showBookmarks = function() {
            $scope.showSection([
                { name: 'sectionNews', isShow: false },
                { name: 'bookmarks', isShow: true }
            ]);
            $(".logo").addClass("logo_top");

            utilityService.scrollPageToTop();
        };
    }
})();
