
// app.js

//	Modules ==================================================
var database					= require("./database/dbinit.js");
var express 					= require("express");
var app 						= express();
var bodyParser 					= require("body-parser");
var studentRecordController 	= require('./server/controller/student-record-controller');
var dbConnector					= require('./database/dbinit.js');

var logger						= require('morgan'); // HTTP Req/Res Logger (not Morgan Freeman)
var multer  					= require('multer'); // Parsing multi-part/form data



//	Configuration ============================================

var port = process.env.PORT || 8000;

	// Middleware registration
app.use(bodyParser());
app.use(logger('dev'));
app.use(multer());

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
})


//	Set the static files location (This is so the app will be able to find images, html, and javascript files)
//	............Refactored to use the entire 'client' folder.

app.use(express.static(__dirname + "/client"));


// Controller


dbConnector.init();
var db = dbConnector.getInstance();


var studentRecordController = require(__dirname+"/server/controller/student-record-controller.js");

// Routes ======================================================

app.post("/api/studentRecord/", studentRecordController.create);
app.get("/api/studentRecord/", studentRecordController.list);


//	Start app ==================================================

app.listen(port);
console.log("Server started @port=" + port);


