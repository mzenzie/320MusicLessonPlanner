var assert = require('assert');
var StudentRecord = require('../server/model/student-record.js');
var Account = require('../server/model/account.js');
var fs = require('fs');
var format = require('string-format');
var TID = 1;

format.extend(String.prototype); //allows usage of String.format(arg1, arg2), i.e. "Hello {0}".format(name); -> "Hello "

/*
This Unit Test tests the database class, and StudentRecord class (dbinit.js and student-record.js).
*/


var db, app;
function setup(){
    app = require('../database/dbinit.js');
    app.init('./test.sql');        
    // app.reinit();
    db = app.getInstance();
}

describe('Test 1', function() {
    var self;
    var d = new Date();
    var n = d.toDateString();
    
     student = {
        // NOTE ** SHOULD REMAIN IN DB FOR TESTING 
        firstName: 'Josh',
        lastName: 'Levine',
        instrument: 'Timpani',
        email: 'Josh@gmail.com',
        phone: '412-123-5439',
        address: '12 King Street',
        birthday: new Date(1993, 8, 1),
        startDate: new Date(2015, 4, 3),
        numberOfLessons: '5',
        lessonTime: new Date('2015-04-03T03:30:00'),
        lessonLength: '45',
        generalNotes: 'My notes',
        tid: TID
    }
    var student2 = {
        firstName: 'Kyle',
        lastName: 'Lemmings',
        instrument: 'Timpani',
        email: 'Josh@gmail.com',
        phone: '412-123-5439',
        address: '12 King Street',
        birthday: new Date(1993, 8, 1),
        startDate: new Date(2015, 5, 1),
        numberOfLessons: '5',
        lessonTime: new Date('T03:00:00'), // intended wrong date format
        lessonLength: '60',
        generalNotes: 'My other notes',
        tid: TID
    }
    var student3 = {
        firstName: 'What',
        tid: TID
    }


    describe('Database', function(){
        setup();
        var exists = fs.existsSync('./test.sql');
        it('should have been created as test.sql', function(){
            assert.equal(true, exists);
        })  
        it('should not be null', function()
        {
            assert.notEqual(db, null);
        })
        it('should not be undefined', function()
        {
            assert.notEqual((db===undefined), true)
        })
        it('should have run function', function(){
            assert.equal(typeof db.run, 'function');
        })
        it('should start empty', function()
        {
            db.all("SELECT * FROM SRecord", function(err, row){
                assert.equal(row.length, 0);
            });
        })
    })

    
    describe('StudentRecord - [CRUD operations]', function() {   
        it('should have created a student 1 with no error - CREATE & SAVE', function(done){
            /* Tests CREATE & SAVE */
            StudentRecord.create(student, function(err, studentRecord){
                assert(studentRecord!=null);
                assert(err==null);
                done();
            });
        });

        it('should have an error on student record 2', function(done){
            /* Tests isValidInput */
            StudentRecord.create(student2, function(err, studentRecord){
                assert(err!=null);
                assert(studentRecord==null);
                done();
            });
        });

        it('should have student 1 in database & GET should work', function(done){
            var query = "SELECT * FROM SRecord WHERE firstName='{0}'".format(student.firstName);
            db.get(query, function(err, record){
                assert(record.firstName==student.firstName);
                var sr = new StudentRecord(record);
                StudentRecord.get(sr.sid, function(_err, _sr){
                    assert(_err==null);
                    assert(_sr!=null);
                    assert(_sr.firstName==sr.firstName);
                    assert(_sr.lastName==sr.lastName);
                    assert(_sr.email==sr.email);
                    assert(_sr.address==sr.address);
                    assert(_sr.instrument==sr.instrument);
                    assert(student.numberOfLessons==_sr.lessonSchedules.length);
                    student.sid = _sr.sid;
                    done();
                });
            });
        });

        it('should be able to SAVE student2', function(done){
            student2.lessonTime = student.lessonTime;
            sr2 = new StudentRecord(student2);
            assert.equal(typeof sr2.save, 'function');
            sr2.save(TID, function(err, _sr2){
                assert(err==null);
                assert(_sr2!=null);
                assert(_sr2.firstName==student2.firstName);
                assert(_sr2.sid==2);
                student2.sid = _sr2.sid;
                done();
            })
        });

        it('should be able to UPDATE', function(done){
            student.firstName = 'Bob'
            student.lastName = 'Jones'
            student.email = 'bob.jones@jones.com'
            student.address = "123 street"
            student.instrument = "Guitar"
            student.birthday = new Date(2000, 1,1);
            student.generalNotes = "updated notes";
            sr = new StudentRecord(student);
            assert.equal(typeof sr.update, 'function');
            assert(sr.sid == 1);
            sr.update(function(err, u){
                assert(err==null);
                assert(u!=null);
                assert(u.firstName==student.firstName);
                assert(u.lastName==student.lastName);
                assert(u.email==student.email);
                assert(u.birthday==student.birthday);
                assert(u.generalNotes == student.generalNotes);
                assert(u.instrument == student.instrument);
                done();
            });
        });

        it('should be able to LIST all student records',function(done){
            StudentRecord.list(TID, function(err, records){
                assert(err==null);
                assert(records!=null);
                assert(records.length==2);
                assert(records[0].firstName==student.firstName);
                assert(records[1].firstName==student2.firstName);
                assert(records[0].sid==student.sid);
                assert(records[1].sid==student2.sid);
                done();
            });
        });

        it('should be able to DELETE <deleted student2>', function(done){
            StudentRecord.delete(student2.sid, function(err){
                assert(err==null);
                StudentRecord.get(student2.sid, function(err, s){
                    assert(err==null);
                    assert(s==null);
                    done();
                });
            });
        });

        it('should not be able to SAVE due to incomple object', function(done){
            var st = new StudentRecord(student3);
            st.save(TID, function(err, data){
                assert(err!=null);
                assert(data==null);
                done();
            });
        });

        it('should not be able to UPDATE due to incomple object', function(done){
            StudentRecord.get(1, function(err, sr){
                assert(err==null);
                assert(sr!=null);
                sr.lastName = undefined;
                sr.update(function(err, sr){
                    assert(err!=null);
                    assert(sr==null);
                    done();
                });
            });
        });
    })

});