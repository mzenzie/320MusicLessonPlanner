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
module.exports.openConnection = function(){dbinit.init();}
dbinit.init()

/*
var stmt = db2.prepare("INSERT INTO SRecord VALUES (?, ?, ?, ?)");
stmt.run(1, "mike", "mary");
db2.each("SELECT * FROM SRecord", function(err, row) {
    console.log(row.sid + " " + row.FName);
});
stmt.finalize();
db2.close();*/
