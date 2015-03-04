/*var path = "./music_db.sqlite";
var dblib = require('./db.js');
var manager = dblib.getDBManager(path);
manager.db = manager.loadDB(path);
*/
var fs = require("fs");
var file = './mlp.sql'; //file used to store the data
var exists = fs.existsSync(file);// if the file not exist create a new one

teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Name TEXT, Address TEXT, Phone TEXT);";
//stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, FName TEXT, LName TEXT, Instrument TEXT);";
stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY, tid INTEGER references Teacher(tid), Email TEXT, FName TEXT, LName TEXT, Address TEXT, Phone TEXT, Instrument TEXT);";
schTable = "CREATE TABLE Schedule(schid INTEGER PRIMARY KEY AUTOINCREMENT, Date DATE, Start time, End time, sid INTEGER references SRecord(sid));";
LRTable = "CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY, Date DATE, Notes TEXT, sid INTEGER references SRecord(sid));";

// connect to the database and return the pointer to db
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

			var stmt = db.prepare("INSERT INTO SRecord (FName, LName, Instrument) VALUES(?, ?, ?)");
			stmt.run("Jack", "Benny", "Piano");
			stmt.run("Bruce", "Springsteen", "Violin");
			stmt.run("Prince", "", "Guitar");
			stmt.run("Mike", "Smith", "Trombone");
			stmt.finalize();
			console.log("hello databae________________");
		}
	});
	return db;
}


/*module.exports.close = function(){
	db.close();
}*/
