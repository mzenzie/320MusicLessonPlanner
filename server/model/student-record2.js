/**
 * Instantiates a new student record.
 * @param {String} _firstname is the student's first name
 * @param {String} _lastname is the student's last name
 * @param {String} _instrument is the student's instrument
 * @param {String} _email is the student's email
 * @param {String} _phone is the student's phone number
 * @param {String} _address is the student's home address
 * @param {String} _bd is the student's birthday
 * @param {String} _stdate is the student's lessons start date
 * @param {String} _numOfLes is the number of lessons this student 
 * is initially booked with (this can be extended later using update)
 * @param {String} _startTime is the start time (format TBD) of the student's lesson
 * @param {String} _hours is the number of hours each lesson will last (0.5 is 30 minute lesson)
 */

var StudentRecord = function(_firstname, _lastname, _instrument, _email, _phone, _address, _bd, _stdate, _numOfLes, _startTime, _hours){
	this.firstName = _firstname;
	this.lastName = _lastname;

	// TODO: Validation of e-mail and phone
	this.email = _email;
	this.phone = _phone;
	//

	this.address = _address;
	this.birthday = _bd;
	this.startDate = _stdate;
	this.numberOfLessons = _numOfLes;
	this.startTime = _startTime;
	this.hours = _hours;
	this
	this.id = -1;
	// Notes is the list of lesson notes for this student.
	// Initialized to null because a new student has no lesson notes.
	this.notes = null;
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
	return this;
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
StudentRecord.prototype.update = function(){
	//TODO: implement function
};

// Exports the student record to allow it to be used by
// the student record controller (or any other controller)
module.exports = StudentRecord;

// Static Methods //

/**
 * Check wether input (during creating new student) is valid.
 */
module.exports.isInputValid =function(_email, _phone, _bd, _stdate, _numOfLes, _startTime, _hours){
	//TODO: implement function
	//		determine what are necessary inputs 
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
module.exports.create = function(_firstname, _lastname, _instrument, _email, _phone, _address, _bd, _stdate, _numOfLes, _startTime, _hours){
	//TODO: implement
	//		loop to create multiple student records
};

