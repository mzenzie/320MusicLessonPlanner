/*var path = "./music_db.sqlite";
var dblib = require('./db.js');
var manager = dblib.getDBManager(path);
manager.db = manager.loadDB(path);
*/
var fs = require("fs");
var file = "./mlp.sqlite"; //file used to store the data
var exists = fs.existsSync(file);// if the file not exist create a new one

//connect to the database
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);



teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Name TEXT, Address TEXT, Phone TEXT);";
//stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, FName TEXT, LName TEXT, Instrument TEXT);";
stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY, tid INTEGER references Teacher(tid), Email TEXT, FName TEXT, LName TEXT, Address TEXT, Phone TEXT, Instrument TEXT);";
schTable = "CREATE TABLE Schedule(schid INTEGER PRIMARY KEY AUTOINCREMENT, Date DATE, Start time, End time, sid INTEGER references SRecord(sid));";
LRTable = "CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY, Date DATE, Notes TEXT, sid INTEGER references SRecord(sid));";



module.exports.init = function(){
	manager.db.serialize(function(){
		// if the file is not exist create tables
		manager.db.run(teaTable);
		manager.db.run(stuTable);
		manager.db.run(schTable);
		manager.db.run(LRTable);
	});
}

module.exports.close = function(){
	manager.db.close();
}