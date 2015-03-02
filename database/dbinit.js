var path = "./music_db.sqlite";
var dblib = require('./db.js');
var manager = dblib.getDBManager(path);
manager.db = manager.loadDB();
manager.execute("CREATE TABLE TEACHER (TID INTEGER PRIMARY KEY AUTOINCREMENT, EMAIL, CONTACT, ADDRESS, NAME);");
manager.execute("CREATE TABLE STUDENT (SID INTEGER PRIMARY KEY AUTOINCREMENT, TID FOREIGN KEY,  NAME, PHONE, EMAIL, ADDRESS, INSTRUMENT);");
manager.execute("CREATE TABLE SCHEDULE (SCHID INTEGER PRIMARY KEY AUTOINCREMENT, Date DATE, Start time, end time, FOREIGN KEY(sid) REFERENCES STUDENT(SID));");
manager.execute("CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY AUTOINCREMENT, Date DATE, Notes TEXT, FOREIGN KEY(sid) REFENCES STUDENT(SID));");
manager.saveDB()
