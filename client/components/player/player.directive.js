(function() {
    'use strict';

    angular
        .module('app')
        .directive('player', player);

    function player() {
        return {
            restrict: 'E',
            templateUrl: '/components/player/player.tmpl.html',
            controller: 'playerCtrl'
        };
    }
})();
