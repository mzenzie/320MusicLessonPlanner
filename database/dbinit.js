var fs = require("fs");
var file = './mlp.sql'; //file used to store the data
var exists = fs.existsSync(file);// if the file not exist create a new one

teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, FName TEXT, LName TEXT, Address TEXT, Phone TEXT);";
//stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, FName TEXT, LName TEXT, Instrument TEXT);";
stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, tid INTEGER references Teacher(tid), Email TEXT, FName TEXT, LName TEXT, Address TEXT, Phone TEXT, birthday DATE, Instrument TEXT, GeneralNotes TEXT);";
schTable = "CREATE TABLE Schedule(schid INTEGER PRIMARY KEY AUTOINCREMENT, Date DATE, Start DATETIME, End DATETIME, sid INTEGER references SRecord(sid));";
LRTable = "CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY AUTOINCREMENT, Date DATE, Notes TEXT, sid INTEGER references SRecord(sid));";

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
			console.log("hello databae________________");
			*/
		}
	});
}

module.exports.getInstance = function(){
    return db;
}
