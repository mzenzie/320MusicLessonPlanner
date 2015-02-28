var StudentRecord = require('../model/student-record.js');

module.exports.create = function (req, res) {
	var newStudRec = new StudentRecord(req.body.firstName, req.body.lastName, req.body.instrument);
	newStudRec.create();
	res.json({});
};

module.exports.list = function (req, res) {
	res.json(StudentRecord.list());
}



// 	OLD CODE
// var StudentRecord = require("../model/student-record.js");

// module.exports.list = function(req, res){
// 	console.log("GET to server");
// 	// console.log(StudentRecord.list());
// 	res.json(StudentRecord.list());
// };

// module.exports.create = function(req, res){
// 	console.log("POST to server");
// 	// var newStudRec = new StudentRecord(req.body.name, req.body.instrument, req.body.date, req.body.freq);
// 	var newStudRec = new StudentRecord(req.body.name, req.body.instrument);
// 	// console.log(newStudRec);
// 	newStudRec.create();
// 	console.log("in ctrl");
// 	console.log(StudentRecord.list());
// 	console.log("/in ctrl");
// 	res.json({});
// };