var assert = require('assert');
var studentCtrl = require('../server/controller/student-record-controller.js');
var fs = require('fs');
var format = require('string-format');

format.extend(String.prototype); //allows usage of String.format(arg1, arg2), i.e. "Hello {0}".format(name); -> "Hello "

describe('Database', function() {
    var db, app;
    var self;
    var d = new Date();
    var n = d.toDateString();
    
    var student = {body:''};
     
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
        generalNotes: 'My notes'
    }
    var student2 = {}
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
        generalNotes: 'My other notes'
    }

    function setup()
    {
        app = require('../database/dbinit.js');
        app.init();        
        app.reinit();
        db = app.getInstance();
    }

    describe('database initialized', function(){
        setup();
        var exists = fs.existsSync('./mlp.sql');
        it('mlp.sql created', function(){
            assert.equal(true, exists);
        })  
        it('db not null', function()
        {
            assert.notEqual(db, null);
        })
        it('db not undefined', function()
        {
            assert.notEqual((db==undefined), true)
        })
        it('db has run function', function(){
            assert.equal(typeof db.run, 'function');
        })
        it('should start empty', function()
        {
            db.all("SELECT * FROM SRecord", function(err, row){
                assert.equal(row.length, 0);
            });
        })
    })

    
    describe('Manipulate students in database which', function() {   
        setup();
        
        studentCtrl.create(student);
        it('should have a student', function()
        {
            db.all("SELECT * FROM SRecord", function(err, row){
                assert.equal(row.length, 1)
            });
        })

        var sid = 0;
        var student_record_get_query = 
            format("SELECT * FROM SRecord WHERE firstName='{0}' AND lastName='{1}' AND instrument = '{2}'",
                student.body.firstName,
                student.body.lastName,
                student.body.instrument);
        //console.log(student_record_get_query);
        it('should contain that student', function(){
            db.get(student_record_get_query, function(err, row){
                assert.equal(row.length, 1)
                if (err!= null || row == null){
                    //console.log(err);
                } else {
                    sid = row.sid;
                    callback(err, self);
                }
            });
        })
        it('should correctly modify that student', function(){
            var req = {query: {sid: sid}, body: {firstname: 'newName', lastName: 'Jones', instrument: 'Violin' }};
            var res = {};
            studentCtrl.update(req, res);
            var updated_student_query = 
            format("SELECT * FROM SRecord WHERE firstName='{0}' AND lastName='{1}' AND instrument = '{2}'",
                'newName',
                'Jones',
                'Violin');
            db.get(student_record_get_query, function(err, row){
                assert.equal(row.length, 1)
                if (err!= null || row == null){
                    console.log(err);
                } else {
                    sid = row.sid;
                    callback(err, self);
                }
            });
        })
        it('should then delete that student to have zero students', function() {
            var req = {query: { sid: sid}};
            var res = {};
            studentCtrl.delete(req, res);
            studentCtrl.get(req, res);
            assert.equal(res.json, null);
        }) 
    })


    //These tests ensure existance of functions
    describe('getInstance', function () {
        it('function exists', function () {
            assert.equal(typeof app.getInstance, 'function');
        })
    })
    describe('reinit', function () {
        it('function exists', function () {
            assert.equal(typeof app.reinit, 'function');
        })
    })
    describe('init', function () {
        it('function exists', function () {
            assert.equal(typeof app.init, 'function');
        })
    })

});