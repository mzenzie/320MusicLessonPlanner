var path = "./music_db.sqlite";
var dblib = require('db.js');
var manager = dblib.getDBManager();
manager.db = manager.loadDB(path);
manager.execute("CREATE TABLE TEACHER (TID PRIMARY KEY, EMAIL, CONTACT, ADDRESS, NAME)");
manager.execute("CREATE TABLE STUDENT (SID PRIMARY KEY, TID FOREIGN KEY,  NAME, PHONE, EMAIL, ADDRESS, INSTRUMENT");
manager.execute("CREATE TABLE");
manager.execute();
