 app.directive('spinner', function() {
    return {
        restrict: 'E',
        scope: {
            hideGif: '=',
            hideCss: '='
        },
        templateUrl: '../../components/spinner/spinner.tmpl.html'
    };
});
