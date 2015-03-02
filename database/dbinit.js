var path = "./music_db.sqlite";
var dblib = require('db.js');
var manager = dblib.getDBManager();
manager.db = manager.loadDB(path);


teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY, Email TEXT, Name TEXT, Address TEXT, Phone TEXT);";
stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY, tid INTEGER references Teacher(tid), Email TEXT, Name TEXT, Address TEXT, Phone TEXT, Instrument TEXT);";
schTable = "CREATE TABLE Schedule(schid INTEGER PRIMARY KEY, Date DATE, Start time, End time, sid INTEGER references SRecord(sid));";
LRTable = "CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY, Date DATE, Notes TEXT, sid INTEGER references SRecord(sid));";

manager.db.run(teaTable);
manager.db.run(stuTable);
manager.db.run(schTable);
manager.db.run(LRTable);