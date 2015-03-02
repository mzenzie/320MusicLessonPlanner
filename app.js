var database					= require("./database/dbinit.js");

var express 					= require("express");
var app 						= express();
var bodyParser 					= require("body-parser");
var studentRecordController 	= require('./server/controller/student-record-controller');


app.use(bodyParser());

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
})

app.use("/js", express.static(__dirname + "/client/js"));
app.use("/images", express.static(__dirname + "/client/views/images"))
app.use("/htmlViews", express.static(__dirname + "/client/views/htmlViews"))

// controller
var studentRecordController = require(__dirname+"/server/controller/student-record-controller.js");
// routes
app.post("/api/studentRecord", studentRecordController.create);
app.get("/api/studentRecord", studentRecordController.list);
app.listen(8000, function() {
	console.log('Listening on 8000');
	database.init();
});

// Old code
// var path = require("path");
// app.use(bodyParser());
// app.get("/", function(req, res){
// 	console.log(__dirname);
// 	res.sendFile(__dirname+"/client/views/index.html", function(err){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("index.html sent");
// 		}
// 	})
// })

// test
// var StudentRecord = require("model/student-record.js");
// var newSTud = new StudentRecord()


// console.log(__dirname+"/server/controller/student-record-controller.js");

