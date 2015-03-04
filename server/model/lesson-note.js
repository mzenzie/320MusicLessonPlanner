/*
 * @param {String} _notes : the node id
 * @param {Date} _date : the node id
 * @param {int} _nid : the node id
 */
var LessonNote = function(_notes, _date, _nid){
	this.notes = _notes;
	this.date = _date;
	this.nid = _nid;
};

/*
 * Delete current instance of lesson note.
 */
LessonNote.prototype.delete = function(){
	//TODO: delete lesson note from DB
	return this;
};

/*
 * Save lesson note.
 */
LessonNote.prototype.save = function(){
	//TODO: save lesson note to DB
	return this;
};

module.exports = LessonNote;

// STATIC FUNCTIONS //

/*
 * Get one the lesson note.
 */
module.exports.get = function(_nid){
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
 * Update lesson note.
 */
module.exports.update = function(_notes, _date, _nid){
	//TODO: update lesson note in DB
	return this;
};

/*
 * Create a lesson note.
 */
module.exports.create = function(_note, _sid){
	//TODO: create lesson note instance and add to DB
	return this;
};