var fs = require("fs");
var file = './mlp.sql'; //file used to store the data
var exists = fs.existsSync(file);// if the file not exist create a new one

/* Any changes to these names/layout needs to be updated to the spreadsheet */

teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT);";
//stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, FName TEXT, LName TEXT, Instrument TEXT);";
stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, tid INTEGER references Teacher(tid), email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, birthday DATE, instrument TEXT, generalNotes TEXT);";
schTable = "CREATE TABLE Schedule(schid INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, lessonTime DATETIME, lessonLength INTEGER, sid INTEGER references SRecord(sid));";
LRTable = "CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, notes TEXT, sid INTEGER references SRecord(sid));";

// connect to the database and return the pointer to db
var db = null;

module.exports.init = function(){
	//connect to the database
	var sqlite3 = require("sqlite3").verbose();
	db = new sqlite3.Database(file);

	db.serialize(function(){
		// if the file is not exist create tables
		if(!exists){
			db.run(teaTable);
			db.run(stuTable);
			db.run(schTable);
			db.run(LRTable);
			/*var stmt = db.prepare("INSERT INTO SRecord VALUES(?, ?, ?, ?)");
			stmt.run(1, "Jack", "Benny", "Piano");
			stmt.run(2, "Bruce", "Springsteen", "Violin");
			stmt.run(3, "Prince", "", "Guitar");
			stmt.run(4, "Mike", "Smith", "Trombone");
			stmt.finalize();
			console.log("hello databae________________"); <-- data"BAE" ? ROFL
			*/
		}
	});

}

module.exports.getInstance = function(){
    return db;
}
