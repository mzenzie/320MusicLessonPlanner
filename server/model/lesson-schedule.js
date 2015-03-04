/*
 * @param {Date} _date : the date of the lesson
 * @param {Date} _startTime : the start time of the lesson
 * @param {Date} _endTime : the end time of the lesson
 * @param {int} _lsid : the lesson id for the database
 */
var LessonSchedule = function(_date, _startTime, _endTime, _lsid){
	this.date = _date;
	this.startTime = _startTime;
	this.endTime = _endTime;
	this.lsid = _lsid;
};

/*
 * Delete current instance of lesson note.
 */
LessonSchedule.prototype.delete = function(){
	//TODO: delete lesson note from DB
	return this;
};

/*
 * Save lesson note.
 */
LessonSchedule.prototype.save = function(){
	//TODO: save lesson note to DB
	return this;
};

module.exports = LessonSchedule;

// STATIC FUNCTIONS //

/*
 * Get one the lesson note.
 */
module.exports.get = function(_lsid){
	//TODO: get lesson note
	return this;
};

/*
 * Get a list of lesson notes.
 * @param _sid : student ID of the student whose 
 * lesson notes are to be retrieved.
 */
module.exports.list = function(_sid){
	//TODO: get multiple lesson notes
	return this;
};

/*
 * Update lesson schedule.
 * Note: only updates fields. Not ID.
 * @param {Date} _startTime
 */
module.exports.update = function(_startTime, _endTime, _lsid){
	//TODO: update lesson schedule in DB
	return this;
};

/*
 * Create one lesson.
 * Note: only updates fields. Not ID.
 * @param {Date} _start
 * @param {Date} _startTime
 * @param {Date} _endTime
 * @param {int} _sid
 */
module.exports.create = function(_date, _startTime, _endTime, _sid){
	//TODO: createLessonNote
	return this;
};





