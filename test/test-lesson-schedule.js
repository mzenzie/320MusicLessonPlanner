var assert = require('assert');
var fs = require('fs');
var LessonSchedule = require('../server/model/lesson-schedule.js');
var StudentRecord = require('../server/model/student-record.js');
var format = require('string-format');
var SID = 1;
var dbConnector = require('../database/dbinit.js');
var db = null;

format.extend(String.prototype);

describe('Test 2', function(){
	db = dbConnector.getInstance();
	var lessonSch1 = {
		date: new Date(2015,2,2),
		lessonTime: new Date("2015-02-02T01:00:00"),
		lessonLength: '30',
		sid:SID
	};

	var lessonSch2 = {
		date: new Date(2015,9,2),
		lessonTime: new Date("2015-04-12T16:00:00"),
		lessonLength: '50',
		sid:SID
	};

	describe('LessonSchedule - [CRUD operations]' , function(){
		it('should be able to SAVE to record', function(done){
			var lesSch = new LessonSchedule(lessonSch1);
			lesSch.save({sid:SID}, function(err, lesSch){
				assert(err==null);
				assert(lesSch!=null);
				lessonSch1 = lesSch;
				db.get('SELECT * FROM Schedule WHERE lsid={0}'.format(lessonSch1.lsid), function(err, row){
					assert(err==null);
					assert(row!=null);
					assert(row.date == lessonSch1.date);
					assert(row.lessonTime == lessonSch1.lessonTime);
					assert(row.lessonLength == lessonSch1.lessonLength);
					done();
				});
			});
		});

		it('should be able to GET previously saved LessonSchedule', function(done){
			LessonSchedule.get(lessonSch1.lsid, function(err, lesSch){
				assert(err==null);
				assert(lesSch!=null);
				assert(lesSch.date.getDate() == lessonSch1.date.getDate());
				assert(lesSch.lessonTime.getTime() == lessonSch1.lessonTime.getTime());
				assert(lesSch.lessonLength == lessonSch1.lessonLength);
				done();
			});
		});

		it('should be able to generate weekly LessonSchedules', function(done){
			student = {
				firstName: 'Kyle',
		        lastName: 'Lemmings',
		        instrument: 'Timpani',
		        email: 'Josh@gmail.com',
		        phone: '412-123-5439',
		        address: '12 King Street',
		        birthday: new Date(1993, 8, 1),
		        startDate: new Date(2015, 5, 1),
		        numberOfLessons: '5',
		        lessonTime: new Date('2015-05-01T13:00:00'), // intended wrong date format
		        lessonLength: '60',
		        generalNotes: 'My other notes',
		        tid: 1
			};
			schedule = {
				date: student.startDate,
				lessonTime: student.lessonTime,
				lessonLength: student.lessonLength,
				numberOfLessons: student.numberOfLessons
			};
			studentRec = new StudentRecord(student);
			studentRec.save(student.tid, function(err, studentRec){
				assert(err==null);
				assert(studentRec!=null);
				LessonSchedule.generateDates(schedule, studentRec, function(err, genRecord){
					assert(err==null);
					assert(genRecord!=null);
					assert(genRecord.length==schedule.numberOfLessons);
					var checkDate = schedule.date;
					for (i in genRecord){
						assert(checkDate.getDate()==new Date(genRecord[i].date).getDate());
						checkDate.setDate(checkDate.getDate()+7);
					}
					done();
				});
			});
		});

		it('should be able to LIST LessonSchedules', function(done){
			LessonSchedule.list(SID, function(err, schedules){
				assert(err==null);
				assert(schedules!=null);
				assert(schedules.length==6); // 5 from generated + 1 from single insertion test
				done();
			});
		});

		it('should be able to UPDATE LessonSchedules', function(done){
			LessonSchedule.get(lessonSch1.lsid, function(err, lesson){
				assert(err==null);
				assert(lesson.update !== undefined);
				lesson.date = new Date(2016,05,05);
				lesson.lessonTime = new Date('2016-05-05T13:00:00');
				lesson.lessonLength = '47';
				lesson.notes = 'newly updated notes';
				lesson.update(function(err, _lesson){
					assert(err==null);
					assert(_lesson!=null);
					LessonSchedule.get(lessonSch1.lsid, function(err, newLesson){
						assert(newLesson.date.getDate()==lesson.date.getDate());
						assert(newLesson.lessonTime.getTime()==lesson.lessonTime.getTime());
						assert(newLesson.notes == lesson.notes);
						assert(newLesson.lessonLength == lesson.lessonLength);
						done();
					});
				});
			});
		});

		it('should be able to DELETE lessonSchedules', function(done){
			LessonSchedule.delete(lessonSch1.lsid, function(err){
				assert(err==null);
				LessonSchedule.get(lessonSch1.lsid, function(err, schedule){
					assert(err==null);
					assert(schedule==null);
					done();
				});
			});
		});
	});
})