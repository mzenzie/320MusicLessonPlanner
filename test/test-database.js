var assert = require('assert');

var fs = require('fs');
var format = require('string-format');
describe('Database', function() {
    var db, app;
    var student = {};
    var self;
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
    self = {
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

    function setup()
    {
        app = require('../database/dbinit.js');
        app.init();        
        db = app.getInstance();

        console.log("before each");
        console.log(db==undefined);
    }

    describe('database initialized', function(){
        setup()
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
    })

    
    describe('Adds to database', function() {   
        setup();
        var student_record_query = 
            format("INSERT INTO SRecord (tid, firstName, lastName, email, address, phone, birthday, instrument) VALUES({0}, '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}')",
                1,
                self.firstName,
                self.lastName,
                self.email,
                self.address,
                self.phone,
                self.birthday,
                self.instrument); 
     
        db.get(student_record_query, function(err, row){
            it('returns given record', function() {
                assert.notEqual(row, null);               
            });
            it('returns without error', function(){
                  assert.equal(err, null);
            assert.equal(row.sid, self.sid);
            });
        });
    })



    describe('getInstance', function () {
        console.log()
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