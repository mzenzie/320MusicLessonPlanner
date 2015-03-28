var format = require('string-format');

var dbConnector = require('../../database/dbinit.js');
<<<<<<< HEAD
if (dbConnector==null) console.log("DATABASE CON NULL");
=======
if (dbConnector == null) console.log("DATABASE CON NULL");
>>>>>>> UIDevBranch-Authentication

/* Stub code */
var __records = [];
var __id = 1;

/**
 * Instantiates a new teacher account.
 * @param {Object} jsObject
 */
<<<<<<< HEAD
var Teacher = function(jsObject){
	// example usage: new Teacher({email: "email@service.com",  firstName: "Cassie", ... [etc]})
	this.firstName = jsObject.firstName;
	this.lastName = jsObject.lastName;
	// TODO: Validation of e-mail and phone
	this.email = jsObject.email;
	this.phone = jsObject.phone;
	//
	this.address = jsObject.address;
	this.tid = null;
=======
var Teacher = function(jsObject) {
    // example usage: new Teacher({email: "email@service.com",  firstName: "Cassie", ... [etc]})
    this.firstName = jsObject.firstName;
    this.lastName = jsObject.lastName;
    // TODO: Validation of e-mail and phone
    this.email = jsObject.email;
    this.phone = jsObject.phone;
    //
    this.address = jsObject.address;
    this.tid = null;
>>>>>>> UIDevBranch-Authentication
};


/**
 * Save a taecher account to the database.
 * Used after changes are made to the account
 * or when a new account is being saved for the first time.
 * 
 * @param {Function} callback the function used to handle database error
 */
<<<<<<< HEAD
StudentRecord.prototype.save = function(callback){
	var self = this; // save model's context. 
	var myErr = null;
	//TODO: save to db
	// returns identifier for StudentRecord
	var db = dbConnector.getInstance();
	console.log("DB SAVE");

	var teacher_account_query = "INSERT INTO Teacher (email, firstName, lastName, address, phone) VALUES('{0}', '{1}', '{2}', '{3}', '{4}')"
						.format(
							self.email,
							self.firstName,
							self.lastName,
							self.address,
							self.phone
							);

	console.log(teacher_account_query);
	
	db.run(student_record_query, function(err){
		if (err !== null){
			console.log("TEACHER ACCOUNT SAVE ERR TO DB");
			myErr = err;
		}
	});
=======
StudentRecord.prototype.save = function(callback) {
    var self = this; // save model's context. 
    var myErr = null;
    //TODO: save to db
    // returns identifier for StudentRecord
    var db = dbConnector.getInstance();
    console.log("DB SAVE");

    var teacher_account_query = "INSERT INTO Teacher (email, email, firstName, lastName, address, phone) VALUES({0}, '{1}', '{2}', '{3}', '{4}', '{5}')"
        .format(
            1,
            self.email,
            self.firstName,
            self.lastName,
            self.address,
            self.phone
        );

    console.log(teacher_account_query);

    db.run(student_record_query, function(err) {
        if (err !== null) {
            console.log("TEACHER ACCOUNT SAVE ERR TO DB");
            myErr = err;
        }
    });
>>>>>>> UIDevBranch-Authentication
};


/**
 * Update a teacher account in the database.
 * 
 * @param {Object} jsObject : contains the information needing to be updated
 */
<<<<<<< HEAD
StudentRecord.prototype.update = function(jsObject){
	//TODO: implement function
=======
StudentRecord.prototype.update = function(jsObject) {
    //TODO: implement function
>>>>>>> UIDevBranch-Authentication
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
<<<<<<< HEAD
module.exports.get = function(tid, callback){
	//TODO: retrieve student based on sid handler
	var db = dbConnector.getInstance();
	console.log("DB GET");
	db.all("SELECT * FROM Teacher WHERE Teacher.tid={0}".format(tid), function(err, rows){
		callback(err, rows);
	});
=======
module.exports.get = function(tid, callback) {
    //TODO: retrieve student based on sid handler
    var db = dbConnector.getInstance();
    console.log("DB GET");
    db.all("SELECT * FROM Teacher WHERE Teacher.tid={0}".format(tid), function(err, rows) {
        callback(err, rows);
    });
>>>>>>> UIDevBranch-Authentication
};

/**
 * Retrieve a list of all the teacher accounts
 * 
 * @param {Function} callback : the function used to handle database error
 */
<<<<<<< HEAD
module.exports.list = function(callback){
	var db = dbConnector.getInstance();
	console.log("DB LIST");
	// need to put , Schedule WHERE Schedule.sid = SRecord.sid
	db.all("SELECT  * FROM Teacher", function(err, rows){
		callback(err, rows);
	});
=======
module.exports.list = function(callback) {
    var db = dbConnector.getInstance();
    console.log("DB LIST");
    // need to put , Schedule WHERE Schedule.sid = SRecord.sid
    db.all("SELECT  * FROM Teacher", function(err, rows) {
        callback(err, rows);
    });
>>>>>>> UIDevBranch-Authentication
};

/**
 * Delete an account from the database.
 *
 * @param {int} tid : the unique id for the account to be deleted
 * @param {Function} callback : the function used to handle database error
 */
<<<<<<< HEAD
module.exports.delete = function(tid, callback){
	var db = dbConnector.getInstance();
	var teacher_query = "DELETE FROM Teacher WHERE Teacher.tid={0}".format(tid);
	console.log(teacher_query);
	db.exec(teacher_query, function(err){
		if (err!=null){
			console.log(err);
			callback(err);
		}
	});
=======
module.exports.delete = function(tid, callback) {
    var db = dbConnector.getInstance();
    var teacher_query = "DELETE FROM Teacher WHERE Teacher.tid={0}".format(tid);
    console.log(teacher_query);
    db.exec(teacher_query, function(err) {
        if (err != null) {
            console.log(err);
            callback(err);
        }
    });
>>>>>>> UIDevBranch-Authentication
};

/**
 * Create a new teacher account and save to the database.
 * 
 * @param {Object} jsObject : 
 * @param {Function} callback : the function used to handle database error
 */
<<<<<<< HEAD
module.exports.create = function(jsObject, callback){
	//TODO: implement
	//		loop to create multiple student records
	console.log("CREATE");
	var newTeacher = new Teacher(jsObject);
	newTeacher.save(callback);
};
=======
module.exports.create = function(jsObject, callback) {
    //TODO: implement
    //		loop to create multiple student records
    console.log("CREATE");
    var newTeacher = new Teacher(jsObject);
    newTeacher.save(callback);
};
>>>>>>> UIDevBranch-Authentication
