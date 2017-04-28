app.directive('userInfo', function(loginService) {
    return {
        restrict: 'E',
        scope: {
            hideSection: '=',
            showBookmarks: '=',
            hideAll: '='
        },
        templateUrl: '/components/userInfo/userInfo.tmpl.html',
        controller: 'userInfoCtrl',
        link: function(scope, element) {
            loginService.getCurrentUser().then(function() {
                if(loginService.loginInfo.isLogin === true) {
                    scope.hideSection = false;
                    setTimeout(function() {
                       $(".user_info").addClass("user_info_slided");
                    }, 400);
                }
                else {
                    scope.hideSection = true;
                }

                scope.username = loginService.loginInfo.username;
                scope.avatarUrl = loginService.loginInfo.avatarUrl;
            });
        }
    };
});
