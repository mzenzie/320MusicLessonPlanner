var assert = require('assert');
var app = require('../server/controller/student-record-controller.js'); // the module
var dbConnector = require('../database/dbinit.js');
var fs = require('fs');
var format = require('string-format');

describe('Student Record Controller', function() {
    var db;
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
        //fs.unlinksync('./mlp.sql');
        dbConnector.init();
        db = dbConnector.getInstance();
    });

    describe('database setup correctly', function(){
        var exists = fs.existsSync('./mlp.sql');
        it('mlp.sql exists', function(){
            assert.equal(true, exists);
        });   
        it('db not null', function()
        {
            assert.notEqual(db, null);
        });
    });

    
    describe('creates record correctly', function() {
        var res = {};
        app.create(student, res);
        it('respond is not null', function() {
            console.log(res + ' is my response');
            assert.notEqual(res, null);
            
        });
        it('response equals the given Record', function() {
            //assert.equal(app.create(student, res).json, student.body);
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

});