var format = require('string-format');

var dbConnector = require('../../database/dbinit.js');
if (dbConnector == null) console.log("DATABASE CON NULL");

/* Stub code */
var __records = [];
var __id = 1;

/**
 * Instantiates a new teacher account.
 * @param {Object} jsObject
 */

var Teacher = function(jsObject) {
    // example usage: new Teacher({email: "email@service.com",  firstName: "Cassie", ... [etc]})
    // TODO: Validation of e-mail and phone
    this.email = jsObject.email;
    this.firstName = jsObject.firstName;
    this.tid=null;
    if (jsObject.tid !== undefined){
        this.tid = jsObject.tid;
    }
    // Current USELESS fields - will do when implementing student account -> 1.0 release

    this.phone = jsObject.phone;
    this.lastName = '';
    this.address = '';
};

function isValidInput(o){
    return o.email!==undefined && o.firstName!==undefined && o.tid!==undefined && o.email!=null;
}


Teacher.prototype.save = function(callback) {
    var self = this; // save model's context. 
    var myErr = null;
    var db = dbConnector.getInstance();

    var teacher_account_query = "INSERT INTO Teacher (email, firstName, lastName, address, phone) VALUES('{0}', '{1}', '{2}', '{3}', '{4}')"
        .format(
            self.email,
            self.firstName,
            self.lastName,
            self.address,
            self.phone
        );
    var get_query = "SELECT * FROM Teacher WHERE Teacher.email='{0}'"
        .format(self.email);
    // console.log(teacher_account_query);
    if (isValidInput(self)){
        db.run(teacher_account_query, function(err) {
            if (err != null) {
                console.log(err);
            }
        })
        .get(get_query, function(err, row){
            if (err != null || row == null){
                console.log(err);
                callback(err, null);
            } else {
                self.tid = row.tid;
                callback(null, self);
            }
        });
    } else {
        callback({error:"invalid teacher object"}, null);
    }
};


/**
 * Update a teacher account in the database.
 * 
 * @param {Object} jsObject : contains the information needing to be updated
 */

Teacher.prototype.update = function(callback) {
    //TODO: implement function
    var db = dbConnector.getInstance();
    self = this;
    var update = "Update Teacher SET email='{0}', firstName='{1}', phone='{2}' WHERE tid={3}"
    .format(this.email, this.firstName,  this.phone, this.tid);
    // console.log(update);
    db.run(update, function(err){
        if(err != null){
            console.log(err);
            callback(err, null);
        } else {
            callback(null, new Teacher(self));
        }
    });
};

// Exports the teacher account to allow it to be used by
// a controller
module.exports = Teacher;

// Static Methods //

/**
 * Retrieve teacher information from database.
 *
 * @param {int} tid : the unique id for the teacher account to be retrieved
 * @param {Function} callback : the function used to handle database error
 */
module.exports.get = function(tid, callback) {
    //TODO: retrieve student based on sid handler
    var db = dbConnector.getInstance();
    db.get("SELECT * FROM Teacher WHERE Teacher.tid={0}".format(tid), function(err, row) {
        if (err!=null || row==null){
            if (row!=null) console.log(err);
            callback(err, null);
        } else {
            var teacher = new Teacher(row);
            callback(err, teacher);
        }
    });
};

/**
 * Retrieve a list of all the teacher accounts
 * 
 * @param {Function} callback : the function used to handle database error
 */

module.exports.list = function(callback) {
    var db = dbConnector.getInstance();
    // need to put , Schedule WHERE Schedule.sid = SRecord.sid
    db.all("SELECT * FROM Teacher", function(err, rows) {
        if (err!=null || rows==null){
            console.log(err);
            callback(err, null);
        } else {
            callback(err, rows);
        }
    });
};

/**
 * Delete an account from the database.
 *
 * @param {int} tid : the unique id for the account to be deleted
 * @param {Function} callback : the function used to handle database error
 */

module.exports.delete = function(tid, callback) {
    var db = dbConnector.getInstance();
    var teacher_query = "DELETE FROM Teacher WHERE Teacher.tid={0}".format(tid);
    // console.log(teacher_query);
    db.exec(teacher_query, function(err) {
        if (err != null) {
            console.log(err);
            callback(err);
        } else {
            callback(null);
        }
    });
};

/**
 * Create a new teacher account and save to the database.
 * 
 * @param {Object} jsObject : 
 * @param {Function} callback : the function used to handle database error
 */
module.exports.create = function(jsObject, callback) {
    //TODO: implement
    //		loop to create multiple student records
    var newTeacher = new Teacher(jsObject);
    newTeacher.save(callback);
};
