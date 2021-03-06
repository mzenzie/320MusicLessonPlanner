var fs = require("fs");
var file = './mlp.sql'; //file used to store the data
var exists = fs.existsSync(file); // if the file not exist create a new one
var didReinit = false;

//accTable = "CREATE TABLE Account(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, tid INTEGER references Teacher(tid));";
accTable = "CREATE TABLE Account(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, tid INTEGER references Teacher(tid) on delete cascade on update cascade);";
//teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT);";

//accTable = "CREATE TABLE Account(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, tid INTEGER);";
teaTable = "CREATE TABLE Teacher(tid INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT);";
stuTable = "CREATE TABLE SRecord(sid INTEGER PRIMARY KEY AUTOINCREMENT, tid INTEGER references Teacher(tid) on delete cascade on update cascade, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, birthday DATE, instrument TEXT, generalNotes TEXT);";
schTable = "CREATE TABLE Schedule(lsid INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, lessonTime DATETIME, lessonLength INTEGER, notes TEXT, sid INTEGER references SRecord(sid) on delete cascade on update cascade);";
//LRTable = "CREATE TABLE LessonRecord(lrid INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, notes TEXT, sid TEXT references SRecord(sid) on delete cascade on update cascade);";

daccTable = "DROP TABLE IF EXISTS Account";
dteaTable = "DROP TABLE IF EXISTS Teacher;"
dstuTable = "DROP TABLE IF EXISTS SRecord;"
dschTable = "DROP TABLE IF EXISTS Schedule;"
//dLRTable = "DROP TABLE IF EXISTS LessonRecord;"

// connect to the database and return the pointer to db
var db = null;

module.exports.init = function(_file) {
    if (_file!=null || _file!==undefined) file = _file;
    var sqlite3 = require("sqlite3").verbose();
    db = new sqlite3.Database(file);
    db.serialize(function() {
        //connect to the database
        if (_file!=null || _file!==undefined){
            console.log("reinitializing test database exists: "+_file);
            db.run(dschTable);
            db.run(dstuTable);
            db.run(dteaTable);
            db.run(daccTable);
            didReinit = true;
            
        } 
        // db.run("PRAGMA foreign_keys = ON");
        // if the file is not exist create tables
        if (!exists || didReinit) {
            console.log("Initializing DB: "+file);
            db.run(accTable);
            db.run(teaTable);
            db.run(stuTable);
            db.run(schTable);
            //db.run(LRTable);
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

module.exports.reinit = function() {
    var sqlite3 = require("sqlite3").verbose();
    db = new sqlite3.Database(file);
    db.serialize(function() {
        db.run(dschTable);
        //db.run(dLRTable);
        db.run(dstuTable);
        db.run(dteaTable);
        db.run(daccTable);

        db.run(accTable);
        db.run(teaTable);
        db.run(stuTable);
        db.run(schTable)
    });

    // db.serialize(function() {
    //     db.run(accTable);
    //     db.run(teaTable);
    //     db.run(stuTable);
    //     db.run(schTable);
    //     //db.run(LRTable);
    //     //db.run("PRAGMA foreign_keys = ON");

    // });
}
module.exports.getInstance = function() {
    // db.run("PRAGMA foreign_keys = ON");
    return db;
}

