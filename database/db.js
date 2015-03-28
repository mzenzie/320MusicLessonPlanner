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
/*var dbinit = require("./dbinit.js");
var db2 = dbinit.getInstance;
module.exports.openConnection = function(){dbinit.init();}


var stmt = db2.prepare("INSERT INTO SRecord VALUES (?, ?, ?, ?)");
stmt.run(1, "mike", "mary");
db2.each("SELECT * FROM SRecord", function(err, row) {
    console.log(row.sid + " " + row.FName);
});
stmt.finalize();
db2.close();
*/
var fs = require("fs");
var dbinit = require("./dbinit.js");

//dbinit.init();
//dbinit.reinit();
dbinit.reinit();
var db = dbinit.getInstance();

//date, lessonTime, lesson length sid

db.run("INSERT INTO Teacher (firstName) VALUES('jack')");
db.run("INSERT INTO SRecord (firstName, tid) VALUES('mary', '1')");
db.run("INSERT INTO Schedule (date, lessonTime, lessonLength, sid) VALUES ('1999-09-18', '18:25:00', '10', '1'),('1999-09-19', '18:25:00', '4', '1'),('1999-09-20', '18:25:10', '2', '1')");
db.run("delete from Teacher where tid = 1");

