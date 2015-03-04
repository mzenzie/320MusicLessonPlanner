/*
 * @param {String} _musicName : the name of the music piece
 * @param {int} _isCompleted : the start time of the lesson
 * @param {String} _spid : the student progress id for the database
 * @param {String} _spid : the student progress id for the database
 * @param {contacts} _spid : the student progress id for the database
 */
var Person = function(_name, _teacherID, _email, _address, _contacts){
	this.name = _name;
	this.teacherID = _teacherID;
	this.email = _email;
	this.address = _address;
	this.contacts = _contacts;
};

/*
 * Delete current instance of student progress.
 */
Person.prototype.delete = function(){
	//TODO: delete person from DB
	return this;
};

/*
 * Save student progress instance.
 */
Person.prototype.save = function(){
	//TODO: save this person instance to DB
	return this;
};

module.exports = Person;

// STATIC FUNCTIONS //

/**
 * Check wether input (during creating new person) is valid.
 * @param {String} _name
 * @param {String} _email
 * @param {String} _address
 * @param {String} _contacts
 */
module.exports.isInputValid =function(_name, _email, _address, _contacts){
	//TODO: implement function
	//		determine what are necessary inputs 
};

/*
 * Get one instance of student progress by student id.
 * @param {int} _id : the student id to get the progress of
 */
module.exports.get = function(_id){
	//TODO: get lesson note
	return this;
};

/*
 * Update student progress.
 * Note: only updates fields. Not ID.
 * @param {String} _name
 * @param {String} _tid
 * @param {String} _email
 * @param {String} _address
 * @param {String} _contacts
 */
module.exports.update = function(_name, _tid, _email, _address, _contacts){
	//TODO: update lesson schedule in DB
	return this;
};

/*
 * Create one person instance.
 * Note: only updates fields. Not ID.
 * @param {String} _musicName
 * @param {boolean} _isCompleted
 * @param {int} _sid
 */
module.exports.create = function(_name, _email, _address, _contacts){
	//TODO: createLessonNote
	return this;
};


