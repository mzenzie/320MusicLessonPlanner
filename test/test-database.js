var assert = require('assert');
var app = require('../database/dbinit.js'); // the module
var fs = require('fs');
var format = require('string-format');

describe('Database', function() {
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
        app.init();
        db = app.getInstance();
    });

    describe('database initialized', function(){
        var exists = fs.existsSync('./mlp.sql');
        it('mlp.sql created', function(){
            assert.equal(true, exists);
        });   
        it('db not null', function()
        {
            assert.notEqual(db, null);
        });
        it('db has run function', function(){
            assert.equal(typeof db.run, 'function');
        });
    });

    
    describe('Gets instance correctly', function() {
        
        it('Create returns given record', function() {
            
        });
    });


    describe('getInstance', function () {
        console.log()
        it('function exists', function () {
            assert.equal(typeof app.getInstance, 'function');
        });
    });
    describe('reinit', function () {
        it('function exists', function () {
            assert.equal(typeof app.reinit, 'function');
        });
    });
    describe('init', function () {
        it('function exists', function () {
            assert.equal(typeof app.init, 'function');
        });
    });

});