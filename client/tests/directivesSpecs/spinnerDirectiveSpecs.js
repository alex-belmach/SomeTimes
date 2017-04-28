describe('spinner directive', function() {
    var $compile, $rootScope, httpBackend;

    beforeEach(module('app'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        httpBackend.whenGET('../../components/spinner/spinner.html').respond(200, '');
    }));

    it('should compile <spinner></spinner> directive', function() {
        var  element = $compile('<spinner></spinner>')($rootScope);
        $rootScope.$digest();
        expect(element[0].outerHTML).toEqual('<spinner class="ng-scope"></spinner>');
    });
});
