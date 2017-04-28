app.controller('RegisterPageCtrl', ['$scope', '$http', '$location', 'loginService',
function($scope, $http, $location, loginService) {
    $scope.showErrorNote = false;

    $scope.makeRequest = () => {
        var userData = {
            name: $scope.name,
            email: $scope.email,
            username: $scope.username,
            password: $scope.password,
            password2: $scope.password2
        };

        loginService.signUp(userData)
        .then(function(response) {
            $scope.showErrorNote = false;
            $location.path('login');
        },
        function(response) {
            if(response.status === 401) {
                $scope.showErrorNote = true;
            }
        });
    };
}]);
