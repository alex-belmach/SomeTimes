(function() {
    'use strict';

    angular
        .module('app')
        .service('browserService', browserService);

    function browserService() {
        return {
            isIE: isIE
        };

        function isIE(browser = navigator.userAgent) {
            if (/MSIE 10/i.test(browser) ||
                /MSIE 9/i.test(browser) ||
                /rv:11.0/i.test(browser) ||
                /Edge\/\d./i.test(browser)) {
                return true;
            }
            return false;
        }
    }
})();
