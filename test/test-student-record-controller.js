// var assert = require('assert');
// var format = require('string-format');
// mockery = require('mockery');

/*
describe('Student Record Controller', function() {
    var db, app;
    var student = {};
    var student2 = {};
    var d = new Date();
    var n = d.toDateString();
    
    student.body = {
        firstName: 'Josh',
        lastName: 'Levine',
        instrument: 'Timpani',
        email: 'Josh@gmail.com',
        phone: '412-123-5439',
        address: '12 King Street',
        birthday: d,
        startDate: d,
        numberOfLessons: '12',
        lessonTime: '12:10',
        lessonLength: '2:00',
    }
    student2.body = {
        firstName: 'Kyle',
        lastName: 'Lemmings',
        instrument: 'Timpani',
        email: 'Josh@gmail.com',
        phone: '412-123-5439',
        address: '12 King Street',
        birthday: 'Sun Mar 29 2015',
        startDate: 'Sun Mar 29 2015',
        numberOfLessons: '12',
        lessonTime: '12:10',
        lessonLength: '2:00',
    }

    beforeEach(function () {
        mockery.enable();
        mockery.registerSubstitute('../model/student-record.js', '/Mocks/mock-student-record.js');
        app = require('../server/controller/student-record-controller.js');
        if(app === null)
            console.log("record controller null");
    });

    afterEach(function(){
        mockery.deregisterAll();
    })

   
    describe('creates record correctly', function() {
            if(app === null)
            console.log("record controller null");
        var res = {};
        app.create(student, res);
        it('respond is not null', function() {
            assert.notEqual(res, null);            
        });
        it('response equals the given Record', function() {
            assert.equal(app.create(student, res).json, student.body);
        });
    });    

    describe('get', function () {
        console.log()
        it('function exists', function () {
            assert.equal(typeof app.get, 'function');
        });
    });
    describe('delete', function () {
        it('function exists', function () {
            assert.equal(typeof app.delete, 'function');
        });
    });
    describe('update', function () {
        it('function exists', function () {
            assert.equal(typeof app.update, 'function');
        });
    });

});//*/