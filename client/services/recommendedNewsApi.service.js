(function() {
    'use strict';

    recommendedNewsApiService.$inject = [
        '$http',
        '$q'
    ];

    angular
        .module('app')
        .service('recommendedNewsApiService', recommendedNewsApiService);

    function recommendedNewsApiService(
        $http,
        $q
    ) {
        return {
            getArticles: getArticles
        };

        function getArticles() {
            return $q.when([
                {
                    thread: {
                        main_image: 'https://pbs.twimg.com/profile_images/378800000597253436/61c8ee04c630d0d71fc6fb2dc0767def_normal.png',
                        title: 'Some heading 1',
                        url: '/'
                    },
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    thread: {
                        main_image: 'https://pbs.twimg.com/profile_images/378800000597253436/61c8ee04c630d0d71fc6fb2dc0767def_normal.png',
                        title: 'Some heading 2',
                        url: '/'
                    },
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    thread: {
                        main_image: 'https://pbs.twimg.com/profile_images/378800000597253436/61c8ee04c630d0d71fc6fb2dc0767def_normal.png',
                        title: 'Some heading 3',
                        url: '/'
                    },
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                }
            ]);
        }
    }
})();
