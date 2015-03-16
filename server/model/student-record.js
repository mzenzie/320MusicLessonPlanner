
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
if (dbConnector==null) console.log("DATABASE CON NULL");

/* Stub code */
var __records = [];
var __id = 1;

var StudentRecord = function(jsObject){
	// example usage: new StudentRecord({firstName: "Natcha",  lastName: "Simsiri", ... [etc]})
	this.firstName = jsObject.firstName;
	this.lastName = jsObject.lastName;

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
	this.instrument = jsObject.instrument;
	
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
		console.log(self.sid);

		var schedule_query = "INSERT INTO Schedule (date, lessonTime, lessonLength, sid) VALUES('{0}', '{1}', '{2}', '{3}'')"
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
 * Delete a student record from the database.
 */
StudentRecord.prototype.delete = function(){
	//TODO: delete from db
};

/**
 * Update a student record in the database.
 */
StudentRecord.prototype.update = function(jsObject){
	//TODO: implement function
};

// Exports the student record to allow it to be used by
// the student record controller (or any other controller)
module.exports = StudentRecord;

// Static Methods //

/**
 * Check wether input (during creating new student) is valid.
 * Parameters include email, phone, birthday, startDate, numOfLessons, startTime, hours
 */
module.exports.isInputValid =function(jsObject){
	//TODO: implement function
	//		determine what are necessary inputs. Fields (mentioned above) 
	//		are accessed through jsObject.{fields} 

};

/**
 * Retrieve student information from database.
 * @param sid is the unique id for the student to be retrieved
 */
module.exports.get = function(sid){
	//TODO: retrieve student based on sid handler
};

/**
 * Retrieve a list of all the students belonging to a given teacher
 * @param tid is the unique id for the teacher who's requesting
 * the list of students
 */
module.exports.list = function(tid, callback){
	var db = dbConnector.getInstance();
	console.log("DB LIST");
	// need to put , Schedule WHERE Schedule.sid = SRecord.sid
	db.all("SELECT  * FROM SRecord", function(err, rows){
		callback(err, rows);
		
	});

};

/**
 * TODO
 */
module.exports.create = function(jsObject, callback){
	//TODO: implement
	//		loop to create multiple student records
	console.log("CREATE");
	var newStudentRecord = new StudentRecord(jsObject);
	newStudentRecord.save(callback);
};
