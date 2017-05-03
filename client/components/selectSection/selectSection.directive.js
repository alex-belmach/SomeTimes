app.directive('selectSection', function () {
    return {
        restrict: 'E',
        scope: {
            showSection: '=',
            showSectionNews: '='
        },
        templateUrl: '/components/selectSection/selectSection.tmpl.html',
        controller: 'selectSectionCtrl'
    };
});
