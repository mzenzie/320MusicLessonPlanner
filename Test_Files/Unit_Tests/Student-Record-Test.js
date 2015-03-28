describe('Controller: StudentRecordController', function () {

    var $scope, ctrl;

    beforeEach(module('inspinia'));

    beforeEach(inject(function($rootScope) {
        $scope = $rootScope.$new();
    }));
   
    beforeEach(inject(function($controller) {
        ctrl = $controller('StudentRecordController');
    }));


    it('should have the test var set', function() {
        var name = 'I Work';
        var actual = ctrl.testname;
        expect(actual).toEqual(name);
    });
})