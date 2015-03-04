//var db = require(dbinit.js);

/*function insertStudent(sid, fname, lname, instrument){
    var inStudent = db.prepare("INSERT INTO StuTable(?,?,?, ?)");
    inStudent.run(sid, fname,lname, instrument);
    inStudent.finalize();   
}

function insertTeacher(tid, fname, lname){
    var inStudent = db.prepare("INSERT INTO StuTable(?,?,?)");
    inStudent.run(tid, fname,lname);
    inStudent.finalize();   
}*/
var dbinit = require("./dbinit.js");
dbinit.init();
db.each("SELECT * FROM SRecord", function(err, row) {
      console.log(row.sid + ": " + row.FName);
  });
module.exports.openConnection = function(){dbinit.init();}

/*
var stmt = db2.prepare("INSERT INTO SRecord VALUES (?, ?, ?, ?)");
stmt.run(1, "mike", "mary");
db2.each("SELECT * FROM SRecord", function(err, row) {
    console.log(row.sid + " " + row.FName);
});
stmt.finalize();
db2.close();*/
/*function loadDB(path){

    var fs = require('fs');
    var SQL = require('sql.js');

    var fileBuffer = fs.readFileSync(path);
    var db = new SQL.Database(fileBuffer);
    return db;
}

function saveDB(path, db){

    var fs = require('fs');
    var SQL = require('sql.js');

    var data = db.export()
    var buffer = newBuffer(data);
    fs.writeFileSync(path, buffer);
}

function execute(command){
    return this.db.exec(command);
}

function getDBManager(path){
    var DBManager = {path: path, db: null, loadDB: loadDB, saveDB: saveDB, execute: execute};
    return DBManager;
}*/

