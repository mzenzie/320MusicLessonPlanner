var format = require('string-format');
var dbConnector = require('../../database/dbinit.js');
if(dbConnector==null) console.log("DATABASE CONN. NULL");


/**
 * @param {Object} jsObject
 */

var LessonNote = function(jsObject) {
    this.notes = jsObject.notes;
    this.date = jsObject.date;
    this.email = jsObject.email;
    this.lnid = null;
};

/**
 * Save lesson note.
 *
 * @param {Function} callback : the function for handling database errors
 */

LessonNote.prototype.save = function(callback) {
    var self = this; // save model's context
    var myErr = null;
    var db = dbConnector.getInstance();
    console.log("DB SAVE");

    // The query that will be used to insert the lesson notes into the appropriate lesson record
    var lesson_note_query = "INSERT INTO LessonRecord (date, notes, email) VALUES({0},'{1}', '{2}', '{3}')"
        .format(
            1,
            self.date,
            self.notes,
            self.email);
    console.log(lesson_note_query);

    db.run(lesson_note_query, function(err) {
        if (err != null) {
            myErr = err;
            console.log("LESSON NOTE SAVE ERR TO DB");
        }
        console.log("BEFORE SENDING BACK");
        console.log(self);
        callback(err, self);
    });
};

module.exports = LessonNote;

// STATIC FUNCTIONS //

/**
 * Get one lesson note.
 */
module.exports.get = function(lnid, callback) {
    var db = dbConnector.getInstance();
    console.log("DB GET");
    db.all("SELECT * FROM LessonRecord WHERE LessonRecord.lnid={0}".format(lnid), function(err, rows) {
        callback(err, rows);
    });
};

/**
 * Get a list of all lesson notes.
 *
 * @param {int} email : email (primary key) of the student whose lesson notes are to be retrieved.
 * @param {Function} callback
 */
module.exports.list = function(email, callback) {
    var db = dbConnector.getInstance();
    console.lod("DB LIST");
    db.all("SELECT * FROM LessonRecord WHERE LessonRecord.email={0}".format(email), function(err, rows)) {
        callback(err, rows);
    }
};

/**
 * Delete current instance of lesson note.
 *
 * @param {int} lnid : the lesson note ID for this lesson note
 * @param {Function} callback : the function for handling database errors
 */
module.exports.delete = function(lnid, callback) {
    //TODO: delete lesson note from DB
    var db = dbConnector.getInstance();
    var lrecord_query = "DELETE FROM LessonRecord WHERE LessonRecord.lnid={0}".format(lnid);
    console.log(lrecord_query);
    db.exec(srecord_query, function(err) {
        if (err != null) {
            console.log(err);
            callback(err);
        }
    })
};

/**
 * Update lesson note.
 */
module.exports.update = function(_notes, _date, _nid) {
    //TODO: update lesson note in DB
};

/**
 * Create a lesson note.
 *
 * @param {Object} jsObject
 * @param {Function} callback
 */
module.exports.create = function(jsObject, callback) {
    console.log("CREATE");
    var newLessonNote = new LessonNote(jsObject);
    newLessonNote.save(callback);
};
