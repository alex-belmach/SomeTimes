(function() {
    'use strict';

    playerCtrl.$inject = [
        '$scope',
        'isIEService'
    ];

    angular
        .module('app')
        .controller('playerCtrl', playerCtrl);

    function playerCtrl(
        $scope,
        isIEService
    ) {
        $scope.setPlayer = function(browser = navigator.userAgent) {
            if (!device.tablet() && !device.mobile() && !isIEService.detect(browser)) {
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
