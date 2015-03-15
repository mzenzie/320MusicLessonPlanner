
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

StudentRecord.prototype.toString = function(){
	return String.format("[STUDENT-RECORD]->\nfirstName: {0}", this.firstName);
}


/**
 * Save a student record to the database.
 * Used after changes are made to a student account
 * or when a new student is being saved for the first time.
 */
StudentRecord.prototype.save = function(){
	//TODO: save to db
	// returns identifier for StudentRecord
	var db = dbConnector.getInstance();
	console.log("SAVE");
	console.log(db);
	var student_record_query = "INSERT INTO SRecord (tid, firstName, lastName, email, address, phone, birthday, instrument) VALUES(1,'"+ 
						this.firstName + "','" +
						this.lastName + "','" +
						this.email + "','" +
						this.address + "','" +
						this.phone + "','" +
						this.birthday + "','" + 
						this.instrument+"')";
	


	console.log(student_record_query);
	db.run(student_record_query, function(err){
		if (err !== null){
			console.log("STUDENT RECORD SAVE ERR TO DB");
		}
	});
	// var sid_query = "SELECT sid FROM SRecord WHERE SRecord.email = '" + this.email + "'"; //assuming email is unique
	// console.log(sid_query);
	// db.get(sid_query, function(err, row){
	// 	console.log("==== GET SID");
	// 	console.log(row);
	// 	this.sid = row.sid;
	// 	console.log(this.startDate);
	// 	var schedule_query = "INSERT INTO Schedule (date, lessonTime, lessonLength, sid) VALUES('" +
	// 						this.startDate + "', '" +
	// 						this.lessonTime + "', '" + 
	// 						this.lessonLength + "', '" +
	// 						this.sid + "')";
	// 	console.log(schedule_query);
	// 	db.run(schedule_query, function(err){
	// 		if (err!= null){
	// 			console.log("SCHDULE RECORD SAVE ERR TO DB");
	// 		}
	// 	})
	// });
	return __id++; 
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
module.exports.list = function(tid, response){
	console.log(dbConnector);
	var db = dbConnector.getInstance();
	console.log("DB LIST");
	var studentRecords = [];
	// need to put , Schedule WHERE Schedule.sid = SRecord.sid
	console.log('hello {0}'.format('world'));
	db.all("SELECT * FROM SRecord", function(err, rows){
		for (var i in rows){
			console.log(rows[i]);

		}
		response.json(rows);
		
	});

};

/**
 * TODO
 */
module.exports.create = function(jsObject){
	//TODO: implement
	//		loop to create multiple student records
	console.log("CREATE");
	var newStudentRecord = new StudentRecord(jsObject);
	console.log("MODEL");
	console.log(newStudentRecord);
	newStudentRecord.save();
	return newStudentRecord;
};
