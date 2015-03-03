var StudentRecord = require('../model/student-record.js');

module.exports.create = function (req, res) {
	var newStudRec = new StudentRecord(	req.body.firstName, 
										req.body.lastName, 
										req.body.instrument,
										req.body.email,
										req.body.address,
										req.body.startDate,
										req.body.lessonTime);
	newStudRec.create();
	res.json({});
};

module.exports.list = function (req, res) {
	res.json(StudentRecord.list());
}
