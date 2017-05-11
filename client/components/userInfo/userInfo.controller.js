(function() {
    'use strict';

    userInfoCtrl.$inject = [
        '$scope',
        '$timeout',
        'loginService'
    ];

    angular
        .module('app')
        .controller('userInfoCtrl', userInfoCtrl);

    function userInfoCtrl(
        $scope,
        $timeout,
        loginService
    ) {
        $scope.uploadAvatar = function() {
            if ($scope.avatarUrl === loginService.getAvatarUrl()) {
                return;
            }

            loginService.uploadAvatar($scope.avatarUrl);
        };

        $scope.logout = function() {
            $(".user_info").removeClass("user_info_slided");

            $timeout(function() {
                $scope.hideAll();
                loginService.logout().then(function() {
                    $scope.hideSection = true;
                });
            }, 400);
        };
    }
})();
