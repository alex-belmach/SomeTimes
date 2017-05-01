app.directive('selectSection', function () {
    return {
        restrict: 'E',
        scope: {
            showSection: '='
        },
        templateUrl: '/components/selectSection/selectSection.tmpl.html',
        controller: 'selectSectionCtrl'
    };
});
