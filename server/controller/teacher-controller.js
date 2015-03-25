var Teacher = require('../model/teacher.js');

module.exports.create = function (req, res) {
	// > POST /api/teacher

	/* triggered for every GET /api/teacher.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
	console.log("CTRLLER");
	console.log(req.body);
	Teacher.create({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			address: req.body.address,
		}, function(err, newTeacher){
			if (err!=null){
				res.json({});
			} else {
				res.json(newTeacher);
			}
		});
}; 

module.exports.list = function (req, res) {
	// > GET /api/teacher

	// var sess = req.session;
	// var id = sess.id; // to be implemented...

	var id = 1; // stub code
	Teacher.list(1, function(err, teachers){
		if (err!=null){
			res.json({});
		} else {
			res.json(teachers);
		}
	});
};

module.exports.get = function(req, res){
	// > GET /api/teacher/:id
	Teacher.get(req.params.id, function(err, teacherObj){
		if (err != null){
			res.json({});
		} else {
			res.json(teacherObj);
		}
	});
}

module.exports.delete = function(req, res){
	// > DELETE /api/studentRecord/:id
	Teacher.delete(req.params.id, function(err){
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
