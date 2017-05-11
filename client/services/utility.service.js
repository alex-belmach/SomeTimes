(function() {
    'use strict';

    angular
        .module('app')
        .service('utilityService', utilityService);

    function utilityService() {
        return {
            getHostName: getHostName,
            sortByLatest: sortByLatest,
            scrollPageToTop: scrollPageToTop
        };

        function getHostName(url) {
            var match = url.match(/(.*):\/\/(www[0-9]?\.)?(.[^/:]+)/i);
            if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
                return match[0];
            }
            else {
                match = url.match(/(.*):\/\/(.[^/:]+)/i);
                if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
                    return match[0];
                } else {
                    return null;
                }
            }
        }

        function sortByLatest(articles) {
            return articles.sort(function(firstArticle, secondArticle) {
                return dateCompareFunction(firstArticle.publishedAt, secondArticle.publishedAt);
            });
        }

        function dateCompareFunction(firstDate, secondDate) {
            return firstDate === secondDate ? 0 : firstDate > secondDate ? -1 : 1;
        }

        function scrollPageToTop() {
            $('html,body').scrollTop(0);
        }
    }
})();
