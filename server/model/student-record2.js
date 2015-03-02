var StudentRecord = function(_firstname, _lastname, _instrument, _email, _phone, _address, _bd, _stdate, _numOfLes, _startTime, _hours){
	this.firstName = _firstname;
	this.lastName = _lastname;
	this.email = _email;
	this.phone = _phone;
	this.address = _address;
	this.birthday = _bd;
	this.startDate = _stdate;
	this.numberOfLessons = _numOfLes;
	this.startTime = _startTime;
	this.hours = _hours;
	this.id = -1;
	this.notes = null; //list of LessonNotes
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

module.exports.get = function(sid){
	//retrieve student based on sid handler
}

StudentRecord.get(sid);

module.exports.list = function(tid){
	//return list of students based on teacher's id
}

module.exports.create = function(_firstname, _lastname, _instrument, _email, _phone, _address, _bd, _stdate, _numOfLes, _startTime, _hours){
	// 
}
