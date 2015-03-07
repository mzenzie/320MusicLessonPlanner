var StudentRecord = require('../model/student-record.js');

module.exports.create = function (req, res) {
	/* triggered for every GET /api/student-record.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
	console.log("CTRLLER");
	console.log(req.body);
	var newStudRec = StudentRecord.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address,
			instrument: req.body.instrument,
			birthday: req.body.birthday,
			startDate: req.body.startDate,
			lessonTime: req.body.lessonTime,
			numberOfLessons: req.body.numberOfLessons,
			lessonLength: req.body.lessonLength
		});
	res.json(newStudRec); // sends back newly created StudentRecord Object.
}; 

module.exports.list = function (req, res) {
	// var sess = req.session;
	// var id = sess.id; // to be implemented...

	var id = 1; // stub code
	StudentRecord.list(1, res);
};

