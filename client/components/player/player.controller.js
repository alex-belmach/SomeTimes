(function() {
    'use strict';

    playerCtrl.$inject = [
        '$scope',
        'browserService'
    ];

    angular
        .module('app')
        .controller('playerCtrl', playerCtrl);

    function playerCtrl(
        $scope,
        browserService
    ) {
        $scope.setPlayer = function(browser = navigator.userAgent) {
            if (!device.tablet() && !device.mobile() && !browserService.isIE(browser)) {
                $(".player").mb_YTPlayer({
                videoURL:'https://www.youtube.com/watch?v=-ILqHSH4X_w',
                autoPlay:true,
                mute:true,
                startAt:10,
                opacity:1,
                showControls : false
                });
            } else {
                $("body").addClass("background");
            }
        };

        $scope.setPlayer();
    }
})();
