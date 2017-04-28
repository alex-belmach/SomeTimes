app.controller('PlayerCtrl', ['$scope', '$rootScope', 'isIEService', function($scope, $rootScope, isIEService) {
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

    //TODO: uncomment to start player
    //$scope.setPlayer();
}]);
