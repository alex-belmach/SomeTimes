app.controller('userInfoCtrl', ['$scope', 'loginService', '$timeout',
function($scope, loginService, $timeout) {
    $scope.uploadAvatar = () => {
        if ($scope.avatarUrl === loginService.loginInfo.avatarUrl) {
            return;
        }

        loginService.uploadAvatar($scope.avatarUrl);
    };

    $scope.logout = () => {
        $(".user_info").removeClass("user_info_slided");

        $timeout(function() {
            $scope.hideAll();
            loginService.logout().then(function() {
                $scope.hideSection = true;
            });
        }, 400);
    };
}]);
