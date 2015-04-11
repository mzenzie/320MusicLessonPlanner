    
/**
 * Instantiates a new student record.
 * @param {String} jsObject.firstname is the student's first name
 * @param {String} jsObject.lastname is the student's last name
 * @param {String} jsObject.instrument is the student's instrument
 * @param {String} jsObject.email is the student's email
 * @param {String} jsObejct.phone is the student's phone number
 * @param {String} jsObject.address is the student's home address
 * @param {String} jsObject.birthday is the student's birthday
 * @param {String} jsObject.startDate is the student's lessons start date
 * @param {String} jsObject.numberOfLessons is the number of lessons this student 
 * is initially booked with (this can be extended later using update)
 * @param {String} _startTime is the start time (format TBD) of the student's lesson
 * @param {String} _hours is the number of hours each lesson will last (0.5 is 30 minute lesson)
 */

var format = require('string-format');
var LessonSchedule = require('./lesson-schedule.js');

var dbConnector = require('../../database/dbinit.js');
if (dbConnector == null) console.log("DATABASE CON NULL");


/**
 * Instantiates a new student record.
 * 
 * @param {Object} jsObject
 */
var StudentRecord = function(jsObject) {
    // example usage: new StudentRecord({firstName: "Natcha",  lastName: "Simsiri", ... [etc]})
    this.firstName = jsObject.firstName;
    this.lastName = jsObject.lastName;
    this.instrument = jsObject.instrument;

    // TODO: Validation of e-mail and phone
    this.email = jsObject.email;
    this.phone = jsObject.phone;
    //

    this.address = jsObject.address;
    if (jsObject.birthday !== undefined){
        if (jsObject.birthday.getDate !== undefined){
            this.birthday = jsObject.birthday;
        } else {
            this.birthday = new Date("{0}".format(jsObject.birthday));
        }
    }
    if (jsObject.startDate !== undefined){
        if (jsObject.startDate.getDate !== undefined){
            this.startDate = jsObject.startDate;
        } else {
            this.startDate = new Date("{0}".format(jsObject.startDate));
        }
    }
    this.lessonTime = jsObject.lessonTime;
    this.numberOfLessons = jsObject.numberOfLessons;
    this.lessonLength = jsObject.lessonLength;

    this.sid = null;
    if (jsObject.sid!==undefined){
        this.sid = jsObject.sid;
    }
    // Notes is the list of lesson notes for this student.
    // Initialized to null because a new student has no lesson notes.
    this.lessonNotes = [];
    this.generalNotes = null;
    if (jsObject.generalNotes !== undefined && jsObject.generalNotes != null){
        this.generalNotes = jsObject.generalNotes;
    }
    this.lessonSchedules = [];
    // Progress is the music record of pieces this student has done.
    // Initialized to null because a new student has no previous music progress.
};


/**
 * Save a student record to the database.
 * Used after changes are made to a student account
 * or when a new student is being saved for the first time.
 * 
 * @param {Function} callback the function used to handle database error
 */
StudentRecord.prototype.save = function(tid, callback){
	var self = this; // save model's context. 
	var myErr = null;
	//TODO: save to db
	// returns identifier for StudentRecord
	var db = dbConnector.getInstance();
	console.log("DB SAVE");
    console.log(self);
	var student_record_query = "INSERT INTO SRecord (tid, firstName, lastName, email, address, phone, birthday, instrument, generalNotes) VALUES({0}, '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}')"
						.format(
							tid,
							self.firstName,
							self.lastName,
							self.email,
							self.address,
							self.phone,
							self.birthday,
							self.instrument,
                            self.generalNotes);
    console.log(student_record_query);

    db.run(student_record_query, function(err){
        if (err !== null){
            console.log("STUDENT RECORD SAVE ERR TO DB");
            console.log(err, null);
        } 

        var student_record_get_query = "SELECT * FROM SRecord WHERE firstName='{0}' AND lastName='{1}' AND email='{2}' AND address='{3}' AND phone='{4}' AND birthday='{5}' AND instrument = '{6}'"
                            .format(
                                self.firstName,
                                self.lastName,
                                self.email,
                                self.address,
                                self.phone,
                                self.birthday,
                                self.instrument);
        console.log(student_record_get_query);
        db.get(student_record_get_query, function(err, row){
            if (err!= null || row == null){
                console.log(err, null);
            } else {
                console.log("== STUDENT RECORD SAVED! ==");
                self.sid = row.sid
        		console.log(self);
        		callback(null, self);
            }
    	});
    })
};


/**
 * Update a student record in the database.
 * 
 * @param {Object} jsObject : contains the information needing to be updated
 */
StudentRecord.prototype.update = function(callback) {
    //TODO: implement function
    var self = this;
    var db = dbConnector.getInstance();
    var query = "UPDATE SRecord SET firstName='{0}', lastName='{1}', address='{2}', phone='{3}', birthday='{4}', instrument='{5}', email='{6}' WHERE sid='{7}'"
                .format(self.firstName, self.lastName, self.address, self.phone, self.birthday, self.instrument,  self.email, self.sid);
    console.log(query);
    db.run(query, function(err){
        if (err!=null){
            console.log(err);
            callback(err, null);
        } else {
            callback(null, new StudentRecord(self));
        }
    });    
};

// Exports the student record to allow it to be used by
// the student record controller (or any other controller)
module.exports = StudentRecord;

// Static Methods //

/**
 * Check wether input (during creating new student) is valid.
 * 
 * @param {Object} jsObject : the object containing all the information that needs to be validated
 */

module.exports.isInputValid =function(jsObject){
	//TODO: implement function
	//		determine what are necessary inputs. Fields (mentioned above) 
	//		are accessed through jsObject.{fields} 
};

/**
 * Retrieve student information from database.
 *
 * @param {int} sid : the unique id for the student to be retrieved
 * @param {Function} callback : the function used to handle database error
 */

module.exports.get = function(sid, callback){
	//TODO: retrieve student based on sid handler
	var db = dbConnector.getInstance();
	var query = "SELECT * FROM SRecord WHERE SRecord.sid={0}".format(sid);
	console.log("DB GET: " + query);
	db.get(query,function(err, row){
        if (err!=null){
            console.log(err);
            callback(err, null);
        } else if (row!==undefined){
            var retrievedStudentRecord = new StudentRecord(row);
            LessonSchedule.list(sid, function(err, schedules){
                if (err!= null || schedules == null){
                    console.log(err);
                    callback(err, null);
                } else {
                    retrievedStudentRecord.lessonSchedules = schedules;
                    console.log(retrievedStudentRecord);
                    callback(null, retrievedStudentRecord);
                }
            });
        } else {
            callback(null, null);
        }
	});
};

/**
 * Retrieve a list of all the students belonging to a given teacher
 * 
 * @param {int} tid : the unique id for the teacher who's requesting
 * the list of students
 * @param {Function} callback : the function used to handle database error
 */


/*

*/
module.exports.list = function(tid, callback) {
    var db = dbConnector.getInstance();
    console.log("DB LIST");
    // need to put , Schedule WHERE Schedule.sid = SRecord.sid
    var list_query = "SELECT * FROM SRecord WHERE SRecord.tid={0}".format(tid);
    console.log(list_query);
    db.all(list_query, function(err, studentRecords) {
        if (err!=null || studentRecords == null){
            console.log(err);
            callback(err, null);
        } else {
            console.log("appending schedules to each records");
            callback(null, studentRecords);
        }
    });

};

/**
 * Delete a student record from the database.
 * Deleting a student record also deletes that student's lesson schedule.
 *
 * @param {int} sid : the unique id for the student to be deleted
 * @param {Function} callback : the function used to handle database error
 */

module.exports.delete = function(sid,callback) {
    var db = dbConnector.getInstance();
    // var drecord_query = "DELETE SRecord, Schedule FROM SRecord INNER JOIN Schedule ON SRecord.sid=Schedule.sid WHERE SRecord.sid = {0}".format(sid);
    var srecord_query = "DELETE FROM SRecord WHERE SRecord.sid={0}".format(sid);
    var schedule_query = "DELETE FROM Schedule WHERE Schedule.sid='{0}'".format(sid);
    // console.log(schedule_query);
    console.log(srecord_query);
    db.exec(srecord_query, function(err) {
        if (err != null) {
            console.log(err);
            callback(err);
        }
        // callback(null);
    })
    .exec(schedule_query, function(err) {
        if (err != null) {
            console.log(err);
        }
        callback(err);
    });
};

/**
 * Create a new student and save their instance to the database.
 * 
 * @param {Object} jsObject : 
 * @param {Function} callback : the function used to handle database error
 */
 /*

db.run("INSERT INTO Schedule (date, lessonTime, lessonLength, sid) 
VALUES ('1999-09-18', '18:25:00', '10', '1'),
('1999-09-19', '18:25:00', '4', '1'),
('1999-09-20', '18:25:10', '2', '1')");


 */
module.exports.create = function(jsObject, callback) {
    //TODO: implement
    //		loop to create multiple student records
    console.log("CREATE");
    var db = dbConnector.getInstance();
    var numberOfLessons = jsObject.numberOfLessons;
    var newStudentRecord = new StudentRecord(jsObject);
    newStudentRecord.save(jsObject.tid, function(err, studentRecord){
        var scheduleData = {
            date: new Date(jsObject.startDate),
            lessonTime: jsObject.lessonTime,
            lessonLength: jsObject.lessonLength,
            numberOfLessons: jsObject.numberOfLessons
        };
        console.log(scheduleData);
        if (err != null || studentRecord == null){
            callback(err, null);
        } else {
            var error = null;
            LessonSchedule.generateDates(scheduleData, studentRecord, function(err, schedules){
                if (err != null || schedules == null){
                    callback(err, null);
                } else {
                    studentRecord.lessonSchedules = schedules;
                    callback(null, studentRecord);
                }
            })
        
        }

    });
};
