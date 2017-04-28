app.directive('footerSection', function(CONSTANTS) {
    return {
        restrict: 'E',
        scope: {
            showLogin: '=?',
            showBack: '=?'
        },
        templateUrl: '../../components/footerSection/footerSection.tmpl.html',
        link: function(scope) {
            scope.developerName = CONSTANTS.developer.name;
            scope.developerLink = CONSTANTS.developer.link;
            scope.showLogin = scope.showLogin || false;
            scope.showBack = scope.showBack || false;
        }
    };
});
