// TBD: Eliminate need for lesson-note.js by adding an additional field to the creation
// of this class that is a string of lesson notes (initialized to the empty string and
// able to be updated later on if wanted)

/**
 * Instantiates a new lesson-schedule.
 * 
 * @param {Date} date
 * @param {Date} startTime
 * @param {int} lessonLength
 * @param {int} sid
 */
var LessonSchedule = function(date, lessonTime, lessonLength, sid) {
    this.date = date;
    this.lessonTime = lessonTime;
    this.lessonLength = lessonLength;
    this.sid = sid;
};

/*
 * Save lesson schedule.
 */
LessonSchedule.prototype.save = function(callback) {
    var self = this;
    var myErr = null;
    var db = dbConnector.getInstance();
    console.log("DB SAVE");

    var lschedule_query = "INSERT INTO Schedule (date, lessonTime, lessonLength, sid) VALUES({0}, '{1}', '{2}', '{3}')"
        .format(
            1,
            self.date,
            self.lessonTime,
            self.lessonLength,
            self.sid);

    console.log(lschedule_query);

    db.run(lschedule_query, function(err) {
        if (err != null) {
            console.log("SCHEDULE SAVE TO DB ERR");
            myErr = err;
        }
    });
};

module.exports = LessonSchedule;

// STATIC FUNCTIONS //

/*
 * Get one the lesson note.
 */
module.exports.get = function(_lsid) {
    //TODO: get lesson note
    return this;
};

/*
 * Get a list of lesson schedules.
 *
 * @param {Text} email
 * @param {Function} callback
 */
module.exports.list = function(email, callback) {
    var db = dbConnector.getInstance();
    console.log("DB LIST");
    db.all("SELECT * FROM Schedule WHERE Schedule.email={0}".format(email), function(err, rows) {
        callback(err, rows);
    });
};

/*
 * Delete current instance of lesson schedule.
 */
module.exports.delete = function(schid) {
    var db = dbConnector.getInstance():
        var lschedule_query = "DELETE FROM Schedule WHERE Schedule.schid={0}".format(schid);
    console.log(lschedule_query);
    db.exec(lschedule_query, function(err) {
        if (err != null) {
            console.log(err);
            callback(err);
        }
    });
};

/*
 * Update lesson schedule.
 * Note: only updates fields. Not ID.
 *
 * @param {Date} lessonTime
 * @param {Date} lessonLength
 * @param {Text} email
 */
module.exports.update = function(lessonTime, lessonLength, email) {
    //TODO: update lesson schedule in DB
};

/*
 * Create a new schedule.
 * Note: only updates fields. Not ID.
 *
 * @param {Object} jsObject
 * @param {Function} callback
 */
module.exports.create = function(jsObject, callback) {
    console.log("CREATE");
    var newLSchedule = new LessonSchedule(jsObject);
    newLSchedule.save(callback);
};
