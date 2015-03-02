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
	this.id = -1;
	// Notes is the list of lesson notes for this student.
	// Initialized to null because a new student has no lesson notes.
	this.notes = null;
	// Progress is the music record of pieces this student has done.
	// Initialized to null because a new student has no previous music progress.
	this.progress = null;

}



StudentRecord.prototype.save = function(){
	//save to db
	return this;
}


Student.prototype.delete = function(){
	//delete from db
}

Student.prototype.update = function(){

}

module.exports = StudentRecord;

// Static Methods //

module.exports.isInputValid =function(_email, _phone,, _bd, _stdate, _numOfLes, _startTime, _hours){

}

module.exports.get = function(){
	//retrieve
}

module.exports.list = function(){
	//turn as list
}

module.exports.create = function(_firstname, _lastname, _instrument, _email, _phone, _address, _bd, _stdate, _numOfLes, _startTime, _hours){
	// 
}

module.exports.getStudentRecords = function(tid){
	
}