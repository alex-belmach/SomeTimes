app.service('utilityService', function() {
    return {
        dateCompareFunction: dateCompareFunction,
        getHostName: getHostName
    };

    function dateCompareFunction(firstDate, secondDate) {
        return firstDate === secondDate ? 0 : firstDate > secondDate ? -1 : 1;
    }

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
});
