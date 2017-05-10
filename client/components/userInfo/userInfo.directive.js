(function() {
    'use strict';

    userInfo.$inject = [
        'loginService',
        'analysisService'
    ];

    angular
        .module('app')
        .directive('userInfo', userInfo);

    function userInfo(
        loginService,
        analysisService
    ) {
        return {
            restrict: 'E',
            scope: {
                hideSection: '=',
                showBookmarks: '=',
                hideAll: '=',
                loggedIn: '='
            },
            templateUrl: '/components/userInfo/userInfo.tmpl.html',
            controller: 'userInfoCtrl',
            link: function(scope, element) {
                loginService.getCurrentUser().then(function(username) {
                    if(loginService.isLoggedIn()) {
                        scope.hideSection = false;
                        setTimeout(function() {
                           $(".user_info").addClass("user_info_slided");
                        }, 400);

                        analysisService.restoreDocuments(username).then(function() {
                            scope.loggedIn = true;
                        });
                    }
                    else {
                        scope.hideSection = true;
                    }

                    scope.username = loginService.loginInfo.username;
                    scope.avatarUrl = loginService.loginInfo.avatarUrl;
                });
            }
        };
    }
})();
