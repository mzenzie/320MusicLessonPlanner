var fs = require("fs");
var file = './mlp.sql'; //file used to store the data
var exists = fs.existsSync(file);// if the file not exist create a new one

teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, tEmail TEXT, passowrd TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT);";
stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, tid INTEGER references Teacher(sid) on delete cascade on update cascade, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, birthday DATE, instrument TEXT, generalNotes TEXT);";
schTable = "CREATE TABLE Schedule(lsid INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, lessonTime DATETIME, lessonLength INTEGER, sid INTEGER references SRecord(sid) on delete cascade on update cascade);";
LRTable = "CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, notes TEXT, sid TEXT references SRecord(sid) on delete cascade on update cascade);";

dteaTable = "DROP TABLE IF EXISTS db.Teacher;"
dstuTable = "DROP TABLE IF EXISTS db.SRecord;"
dschTable = "DROP TABLE IF EXISTS db.Schedule;"
dLRTable = "DROP TABLE IF EXISTS db.LessonRecord;"

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

module.exports.reinit = function(){
	db.run(dteaTable);
	db.run(dstuTable);
	db.run(dschTable);
	db.run(dLRTable);

	db.run(teaTable);
	db.run(stuTable);
	db.run(schTable);
	db.run(LRTable);
}
