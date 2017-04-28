describe('news directive', function() {
    var $compile, $rootScope, httpBackend;

    beforeEach(module('app'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        httpBackend.whenGET('../../components/news/news.html').respond(200, '');
    }));

    it('should compile <news></news> directive', function() {
        var element = $compile('<news></news>')($rootScope);
        $rootScope.$digest();
        expect(element[0].outerHTML).toEqual('<news class="ng-scope"></news>');
    });
});
