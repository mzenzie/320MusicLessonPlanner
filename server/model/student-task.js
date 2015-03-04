/*
 * @param {String} _musicName : the name of the music piece
 * @param {boolean} _isCompleted : the start time of the lesson
 * @param {int} _spid : the student progress id for the database
 */
var StudentTask = function(_musicName, _isCompleted, _spid){
	this.musicName = _musicName;
	this.isCompleted = _isCompleted;
	this.spid = _spid;
};

/*
 * Delete current instance of student progress.
 */
StudentTask.prototype.delete = function(){
	//TODO: delete student progress from DB
	return this;
};

/*
 * Save student progress instance.
 */
StudentTask.prototype.save = function(){
	//TODO: save student progress instance to DB
	return this;
};

module.exports = StudentTask;

// STATIC FUNCTIONS //

/*
 * Get one instance of student progress by student id.
 * @param {int} _sid : the student id to get the progress of
 */
module.exports.get = function(_spid){
	//TODO: get lesson note
	return this;
};

/*
 * Get a list of student progresses.
 * @param _sid : student ID of the student whose 
 * progress is to be retrieved.
 */
module.exports.list = function(_sid){
	//TODO: get multiple lesson notes
	return this;
};

/*
 * Update student task.
 * Note: only updates fields. Not ID.
 * @param {String} _musicName
 * @param {boolean} _isCompleted
 * @param {int} _sid
 */
module.exports.update = function(_musicName, _isCompleted, _sid){
	//TODO: update lesson schedule in DB
	return this;
};

/*
 * Create one student task instance.
 * Note: only updates fields. Not ID.
 * @param {String} _musicName
 * @param {boolean} _isCompleted
 * @param {int} _sid
 */
module.exports.create = function(_musicName, _isCompleted, _spid){
	//TODO: createLessonNote
	return this;
};


