


//	Modules ==================================================
var database					= require("./database/dbinit.js");
var express 					= require("express");
var jwt 						= require("express-jwt");
var app 						= express();
var bodyParser 					= require("body-parser");
var dbConnector					= require('./database/dbinit.js');

var logger						= require('morgan'); // HTTP Req/Res Logger (not Morgan Freeman)
var multer  					= require('multer'); // Parsing multi-part/form data

var format                      = require("string-format"); //allows formating of string
var secret 						= require('./server/config/secret.js');

// controllers
var studentRecordController 	= require('./server/controller/student-record-controller');
var authenticationController 	= require('./server/controller/authentication-controller');
var lessonScheduleController	= require('./server/controller/lesson-schedule-controller');
var lessonNoteController		= require('./server/controller/lesson-note-controller');
var teacherController			= require('./server/controller/teacher-controller');

//	Configuration ============================================

var port = process.env.PORT || 8000;

format.extend(String.prototype); //allows usage of String.format(arg1, arg2), i.e. "Hello {0}".format(name); -> "Hello "

	// Middleware registration
app.use(bodyParser());
app.use(logger('dev'));
app.use(multer());

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
})


//	Set the static files location (This is so the app will be able to find images, html, and javascript files)
//	............Refactored to use the entire 'client' folder.

app.use(express.static(__dirname + "/"));

dbConnector.init();
// var db = dbConnector.getInstance();

// var studentRecordController = require(__dirname+"/server/controller/student-record-controller.js");

// authenticationController.startRedisServer(); //uncomment when authen completes.

// Routes ======================================================
/*  For Angular people, use these routes to make requests, i.e. $resource('/api/studentRecord/:sid/lessonSchedule') 
	or use the lower level http service $http.get('/api/studentRecord/:sid/lessonSchedule/:lsid', callback...) etc etc etc. 
*/

//ACCOUNT
app.post('/api/signout',  jwt({ secret: secret.secretToken }),authenticationController.signout);
app.post('/api/signin', authenticationController.signin);
app.post('/api/signup', authenticationController.signup);

// STUDENT RECORD
app.post("/api/studentRecord/", studentRecordController.create);
app.get("/api/studentRecord/", studentRecordController.get);
app.delete("/api/studentRecord/", studentRecordController.delete);
app.put("/api/studentRecord/", studentRecordController.update);

// LESSON SCHEDULE
app.get('/api/studentRecord/:sid/lessonSchedule/', lessonScheduleController.list);
app.get('/api/studentRecord/:sid/lessonSchedule/:lsid', lessonScheduleController.get);
app.post('/api/studentRecord/:sid/lessonSchedule/', lessonScheduleController.create);
app.delete('/api/studentRecord/:sid/lessonSchedule/:lsid', lessonScheduleController.delete);
app.put('/api/studentRecord/:sid/lessonSchedule/:lsid', lessonScheduleController.update);

//TEACHER
app.get('/api/teacher/', teacherController.get);
app.get('/api/teacher/:id', teacherController.get); // testing

// LESSON NOTES
app.get('/api/studentRecord/:sid/lessonNotes/', lessonNoteController.list);
app.get('/api/studentRecord/:sid/lessonNotes/:lnid', lessonNoteController.get);
app.post('/api/studentRecord/:sid/lessonNotes/', lessonNoteController.create);
app.delete('/api/studentRecord/:sid/lessonNotes/:lnid', lessonNoteController.delete);
app.put('/api/studentRecord/:sid/lessonNotes/:lnid', lessonNoteController.update);





// console.log([1]);
//	Start app ==================================================

app.listen(port);

console.log("Server at port={0}".format(port));

