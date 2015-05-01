var assert = require('assert');
var fs = require('fs');
var LessonSchedule = require('../server/model/lesson-schedule.js');
var StudentRecord = require('../server/model/student-record.js');
var Teacher = require('../server/model/teacher.js');
var format = require('string-format');
var dbConnector = require('../database/dbinit.js');
var db = null;

format.extend(String.prototype);

describe('Test 3', function(){
	db = dbConnector.getInstance();
	teacher1 = {
		firstName: "Rachmaninoff",
		email: "prelude@rach.com",
		phone: "555-555-555"
	}
	teacher2 = {
		firstName: "Mozart",
		email: "mozart@piano.com",
		phone: "413-801-5807"
	};
	teacher3 = {
		firstName: undefined,
		email: undefined,
		phone: "413-801-5807"
	};

	describe('Teacher - [CRUD operations]', function(){
		it('should be able to CREATE teacher', function(done){
			Teacher.create(teacher1, function(err, _teacher){
				assert(err==null);
				assert(_teacher!=null);
				assert(_teacher.firstName==teacher1.firstName);
				assert(_teacher.email==teacher1.email);
				assert(_teacher.phone==teacher1.phone);
				assert(_teacher.tid!=null);
				teacher1 = _teacher;
				done();
			});
		});

		it('should be able to GET teacher', function(done){
			Teacher.get(teacher1.tid, function(err, teacher){
				assert(err==null);
				assert(teacher!=null);
				assert(teacher.firstName==teacher1.firstName);
				assert(teacher.email==teacher1.email);
				assert(teacher.phone == teacher1.phone);
				done();
			});
		});
		it('should be able to SAVE teacher', function(done){
			var teacher = new Teacher(teacher2);
			assert(teacher.save!==undefined);
			teacher.save(function(err, _teacher){
				assert(err==null);
				assert(_teacher!=null);
				assert(teacher2.firstName==_teacher.firstName);
				assert(teacher2.email==_teacher.email);
				assert(teacher2.phone==_teacher.phone);
				assert(_teacher.tid!=null);
				teacher = _teacher;
				done();
			});
		});
		it('should be able to LIST teachers', function(done){
			Teacher.list(function(err, teachers){
				assert(err==null);
				assert(teachers!=null);
				assert(teachers.length==2);
				assert(teachers[0].firstName==teacher1.firstName);
				assert(teachers[1].firstName==teacher2.firstName);
				done();
			});
		});

		it('should be able to UDPATE teacher', function(done){
			Teacher.get(2, function(err, teacher){
				assert(err==null);
				assert(teacher!=null);
				teacher.firstName="Sephiroth";
				teacher.email="masamune@ff7.com";
				teacher.phone="777-777-777";
				teacher.update(function(err, teacher){
					Teacher.get(teacher.tid, function(err, _teacher){
						assert(err==null);
						assert(_teacher!=null);
						assert(_teacher.firstName==teacher.firstName);
						assert(_teacher.email==teacher.email);
						assert(_teacher.phone == teacher.phone);
						done();
					});
				});
			});
		});

		it('should be able to DELETE teacher', function(done){
			Teacher.delete(2, function(err){
				assert(err==null);
				Teacher.get(2, function(err, teacher){
					assert(teacher==null);
					assert(err==null);
					done();
				});
			});
		})

		it('should not be able to save teacher', function(done){
			t3 = new Teacher(teacher3);
			t3.save(function(err, teacher){
				assert(teacher==null);
				assert(err!=null);
				done();
			});
		});

		it('should not be able to get teacher', function(done){
			Teacher.get(undefined, function(err, teacher){
				assert(err!=null);
				assert(teacher==null);
				done();
			});
		})
		
	});
});
