app.service('utilityService', function() {
    return {
        dateCompareFunction: dateCompareFunction
    };

    function dateCompareFunction(firstDate, secondDate) {
        return firstDate === secondDate ? 0 : firstDate > secondDate ? -1 : 1;
    }
});
