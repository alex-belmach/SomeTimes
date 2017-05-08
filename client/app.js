let app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/components/mainPage/mainPage.tmpl.html',
        controller: 'mainPageCtrl'
    })
    .when('/login', {
        templateUrl: '/components/loginPage/loginPage.tmpl.html',
        controller: 'loginPageCtrl'
    })
    .when('/register', {
        templateUrl: '/components/registerPage/registerPage.tmpl.html',
        controller: 'registerPageCtrl'
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
    webhoseApi: {
        baseUrl: 'http://webhose.io/search',
        apiKey: '2eaf5931-aa06-4949-852a-ceafe6ad141b'
    },
    sectionsListPath: '/resources/data/sections.json',
    stopWordsPath: '/resources/data/stopWords.json'
});
