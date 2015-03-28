
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

var dbConnector = require('../../database/dbinit.js');
if (dbConnector == null) console.log("DATABASE CON NULL");

/* Stub code */
var __records = [];
var __id = 1;

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
    this.birthday = jsObject.birthday;
    this.startDate = jsObject.startDate;
    this.numberOfLessons = jsObject.numberOfLessons;
    this.lessonTime = jsObject.lessonTime;
    this.lessonLength = jsObject.lessonLength;

    this.sid = null;
    // Notes is the list of lesson notes for this student.
    // Initialized to null because a new student has no lesson notes.
    this.lessonNotes = null;
    this.generalNotes = null;
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
StudentRecord.prototype.save = function(callback){
	var self = this; // save model's context. 
	var myErr = null;
	//TODO: save to db
	// returns identifier for StudentRecord
	var db = dbConnector.getInstance();
	console.log("DB SAVE");

	var student_record_query = "INSERT INTO SRecord (tid, firstName, lastName, email, address, phone, birthday, instrument) VALUES({0}, '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}')"
						.format(
							1,
							self.firstName,
							self.lastName,
							self.email,
							self.address,
							self.phone,
							self.birthday,
							self.instrument);

	var sid_query = "SELECT sid FROM SRecord WHERE SRecord.email='{0}' AND SRecord.instrument='{1}'"
						.format(self.email, self.instrument); //assuming email is unique
	console.log(student_record_query);
	console.log(sid_query);
	
	db.run(student_record_query, function(err){
		if (err !== null){
			console.log("STUDENT RECORD SAVE ERR TO DB");
			myErr = err;
		}
	}).get(sid_query, function(err, row){
		if (err!=null){
			console.log("SID GET ERR FROM DB");
			myErr = err;
		}
		self.sid =  row.sid;
		console.log(self.sid);

		// This should be done using lesson-schedule.js functions
		// Again, this is a higher order function: that when a new student
		// is created their schedule is simultaneously created. It should
		// not be handled on this level.
		var schedule_query = "INSERT INTO Schedule (date, lessonTime, lessonLength, sid) VALUES('{0}', '{1}', '{2}', '{3}')"
							.format(self.startDate, self.lessonTime, self.lessonLength, self.sid); 
		console.log(schedule_query);
		db.run(schedule_query, function(err){
			if (err!= null){
				myErr = err;
				console.log("SCHDULE RECORD SAVE ERR TO DB");
			}
			console.log("BEFORE SENDING BACK");
			console.log(self);
			callback(err, self);
		});

	});
};


/**
 * Update a student record in the database.
 * 
 * @param {Object} jsObject : contains the information needing to be updated
 */
StudentRecord.prototype.update = function(jsObject) {
    //TODO: implement function
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
	console.log("DB GET");
	db.all("SELECT * FROM SRecord WHERE SRecord.sid={0}".format(sid), function(err, rows){
		callback(err, rows);
		
	});
};

/**
 * Retrieve a list of all the students belonging to a given teacher
 * 
 * @param {int} tid : the unique id for the teacher who's requesting
 * the list of students
 * @param {Function} callback : the function used to handle database error
 */

module.exports.list = function(tid, callback) {
    var db = dbConnector.getInstance();
    console.log("DB LIST");
    // need to put , Schedule WHERE Schedule.sid = SRecord.sid
    db.all("SELECT  * FROM SRecord", function(err, rows) {
        callback(err, rows);

    });

};

/**
 * Delete a student record from the database.
 * Deleting a student record also deletes that student's lesson schedule.
 *
 * @param {int} sid : the unique id for the student to be deleted
 * @param {Function} callback : the function used to handle database error
 */

module.exports.delete = function(sid, callback) {
    var db = dbConnector.getInstance();
    // var drecord_query = "DELETE SRecord, Schedule FROM SRecord INNER JOIN Schedule ON SRecord.sid=Schedule.sid WHERE SRecord.sid = {0}".format(sid);
    var srecord_query = "DELETE FROM SRecord WHERE SRecord.sid={0}".format(sid);
    var schedule_query = "DELETE FROM Schedule WHERE Schedule.sid={0}".format(sid);
    console.log(srecord_query);
    console.log(schedule_query);
    db.exec(srecord_query, function(err) {
        if (err != null) {
            console.log(err);
            callback(err);
        }
    }).exec(schedule_query, function(err) {
        if (err != null) {
            console.log(err);
        }
        callback(err);
    })
};

/**
 * Create a new student and save their instance to the database.
 * 
 * @param {Object} jsObject : 
 * @param {Function} callback : the function used to handle database error
 */
module.exports.create = function(jsObject, callback) {
    //TODO: implement
    //		loop to create multiple student records
    console.log("CREATE");
    var newStudentRecord = new StudentRecord(jsObject);
    newStudentRecord.save(callback);
};
