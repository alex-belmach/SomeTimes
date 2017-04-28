let app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../../components/mainPage/mainPage.tmpl.html',
        controller: 'MainPageCtrl'
    })
    .when('/login', {
        templateUrl: '../../components/loginPage/loginPage.tmpl.html',
        controller: 'LoginPageCtrl'
    })
    .when('/register', {
        templateUrl: '../../components/registerPage/registerPage.tmpl.html',
        controller: 'RegisterPageCtrl'
    })
    .otherwise({ redirectTo: '/'});
});

app.constant('CONSTANTS', {
    developer: {
        name: 'Belmach Aliaksei',
        link: 'https://www.facebook.com/livorni'
    },
    apiKey: 'e0990f52eb2943e4a08c5feb52064044',
    articlesUrl: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    commonUrl: 'http://www.nytimes.com/',
    dataPath: '../resources/data/sections.json'
});
