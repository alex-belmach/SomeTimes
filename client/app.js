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
    newsApi: {
        baseUrl: 'https://newsapi.org/v1',
        apiKey: 'b0b73542b71a444eb1b6a6d3de7e5736'
    },
    apiKey: 'e0990f52eb2943e4a08c5feb52064044',
    articlesUrl: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
    commonUrl: 'http://www.nytimes.com/',
    sectionsListPath: '/resources/data/sections.json'
});
