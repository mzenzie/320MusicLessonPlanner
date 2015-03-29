
/**
 * Save a student record to the database.
 * Used after changes are made to a student account
 * or when a new student is being saved for the first time.
 * 
 * @param {Function} callback the function used to handle database error
 */
StudentRecord.prototype.save = function(callback){

};


/**
 * Update a student record in the database.
 * 
 * @param {Object} jsObject : contains the information needing to be updated
 */
StudentRecord.prototype.update = function(callback) {
    //TODO: implement function
    var self = this;
    var db = dbConnector.getInstance();
    var query = "UPDATE SRecord SET firstName='{0}', lastName='{1}', address='{2}', phone='{3}', birthday='{4}' WHERE SRecord.email='{5}' AND SRecord.instrument='{6}'"
                .format(self.firstName, self.lastName, self.address, self.phone, self.birthday, self.email, self.instrument);
    console.log(query);
    db.run(query, function(err){
        if (err!=null){
            console.log(err);
            callback(err, null);
        } else {
            callback(null, new StudentRecord(self));
        }
    });
};

// Exports the student record to allow it to be used by
// the student record controller (or any other controller)
module.exports = StudentRecord;

// Static Methods //

/**
 * Check wether input (during creating new student) is valid.
 * 
 * @param {Object} jsObject : the object containing all the information that needs to be validated
 */

module.exports.isInputValid =function(jsObject){
	//TODO: implement function
	//		determine what are necessary inputs. Fields (mentioned above) 
	//		are accessed through jsObject.{fields} 
};

/**
 * Retrieve student information from database.
 *
 * @param {int} sid : the unique id for the student to be retrieved
 * @param {Function} callback : the function used to handle database error
 */

module.exports.get = function(sid, callback){
	callback(null, sid);

/**
 * Retrieve a list of all the students belonging to a given teacher
 * 
 * @param {int} tid : the unique id for the teacher who's requesting
 * the list of students
 * @param {Function} callback : the function used to handle database error
 */

module.exports.list = function(tid, callback) {
    callback(null, tid);
};

/**
 * Delete a student record from the database.
 * Deleting a student record also deletes that student's lesson schedule.
 *
 * @param {int} sid : the unique id for the student to be deleted
 * @param {Function} callback : the function used to handle database error
 */

module.exports.delete = function(sid,callback) {
    var db = dbConnector.getInstance();
    // var drecord_query = "DELETE SRecord, Schedule FROM SRecord INNER JOIN Schedule ON SRecord.sid=Schedule.sid WHERE SRecord.sid = {0}".format(sid);
    var srecord_query = "DELETE FROM SRecord WHERE SRecord.sid={0}".format(sid);
    // var schedule_query = "DELETE FROM Schedule WHERE Schedule.email='{0}'".format(email);
    // console.log(schedule_query);
    console.log(srecord_query);
    db.exec(srecord_query, function(err) {
        if (err != null) {
            console.log(err);
            callback(err);
        }
        callback(null);
    });
    // .exec(schedule_query, function(err) {
    //     if (err != null) {
    //         console.log(err);
    //     }
    //     callback(err);
    // })
};

/**
 * Create a new student and save their instance to the database.
 * 
 * @param {Object} jsObject : 
 * @param {Function} callback : the function used to handle database error
 */
module.exports.create = function(jsObject, callback) {
    callback(null, jsObject);    
};
