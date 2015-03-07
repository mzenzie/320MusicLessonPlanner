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

var StudentRecord = function(jsObject){
	// example usage: new StudentRecord({firstName: "Natcha",  lastName: "Simsiri", ... [etc]})
	this.firstName = jsObject.firstname;
	this.lastName = jsObject.lastname;

	// TODO: Validation of e-mail and phone
	this.email = jsObject.email;
	this.phone = jsObject.phone;
	//

	this.address = jsObject.address;
	this.birthday = jsObject.birthday;
	this.startDate = jsObjet.startDate;
	this.numberOfLessons = numberOfLessons;
	this.startTime = jsObject.startTime;
	this.hours = jsObject.hours
	
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
StudentRecord.prototype.save = function(){
	//TODO: save to db
	// returns identifier for StudentRecord
	this.sid = 1;
	return 0; 
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
module.exports.list = function(tid){
	//TODO: return list of students based on teacher's id

};

/**
 * TODO
 */
module.exports.create = function(jsObject){
	//TODO: implement
	//		loop to create multiple student records
	var newStudentRecord = new StudentRecord(jsObject);
	newStudentRecord.save();
	return newStudentRecord;

};
