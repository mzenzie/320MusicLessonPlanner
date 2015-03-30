


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

//TEACHER
app.get('/api/teacher/', teacherController.get);



// console.log([1]);
//	Start app ==================================================

app.listen(port);

console.log("Server at port={0}".format(port));

