app.directive('player', function() {
    return {
        restrict: 'E',
        templateUrl: '../../components/player/player.tmpl.html',
        controller: 'PlayerCtrl'
    };
});
