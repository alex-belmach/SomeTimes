app.controller('LoginPageCtrl', ['$scope',
                                   '$http',
                                   '$location',
                                   'loginService',
                                   function($scope, $http, $location, loginService) {
    $scope.showErrorNote = false;

    $scope.localLogin = () => {
        loginService.signIn($scope.username, $scope.password)
        .then(function(response) {
            if(response.status === 202) {
                $scope.showErrorNote = false;
                $location.url('/');
            }
        },
        function(response) {
            $scope.showErrorNote = true;
        });
    };
}]);
