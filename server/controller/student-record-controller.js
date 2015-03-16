var StudentRecord = require('../model/student-record.js');

module.exports.create = function (req, res) {
	// > POST /api/studentRecord

	/* triggered for every GET /api/student-record.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
	console.log("CTRLLER");
	console.log(req.body);
	StudentRecord.create({
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
		}, function(err, newStudentRecord){
			if (err!=null){
				res.json({});
			} else {
				res.json(newStudentRecord);
			}
		});
}; 

module.exports.list = function (req, res) {
	// > GET /api/studentRecord

	// var sess = req.session;
	// var id = sess.id; // to be implemented...

	var id = 1; // stub code
	StudentRecord.list(1, function(err, studentRecords){
		if (err!=null){
			res.json({});
		} else {
			res.json(studentRecords);
		}
	});
};

module.exports.get = function(req, res){
	// > GET /api/studentRecord/:id
}

module.exports.delete = function(req, res){
	// > DELETE /api/studentRecord/:id
	StudentRecord.delete(req.params.id, function(err){
		if (err != null){
			res.json({isSuccessful:false});
		} else {
			res.json({isSuccessful:true});
		}
	});
}

module.exports.update = function(req, res){
	// > PUT /api/studentRecord/:id
}
