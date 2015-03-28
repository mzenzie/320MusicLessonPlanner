var LessonSchedule = require('../model/lesson-schedule.js');
var StudentRecord = require('../model/student-record.js');

module.exports.create = function (req, res) {
	// > POST /api/lessonSchedule

	/* triggered for every GET /api/lessonSchedule.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
	console.log("CTRLLER");
	console.log(req.body);
	LessonSchedule.create({
			date: req.body.date,
			lessonTime: req.body.lessonTime,
			lessonLength: req.body.lessonLength,
		}, function(err, newSchedule){
			if (err!=null){
				res.json({});
			} else {
				res.json(newSchedule);
			}
		});
}; 

module.exports.list = function (req, res) {
	// > GET /api/studentRecord:sid/lessonSchedule
	var sid = req.params.sid;
	if (sid===undefined){
		res.status(400).send('no sid');
	} else {
		console.log("GETTING SCHEDULE LIST");
		LessonSchedule.list(sid, function(err, schedule){
			if (err!=null || schedule==null){
				res.status(400).send("unable to list schedule");
			} else {
				console.log(schedule);
				res.json(schedule);
			}
		});
	}
};

module.exports.get = function(req, res){
	// > GET /api/lessonSchedule/:id
	LessonSchedule.get(req.params.id, function(err, scheduleObj){
		if (err != null){
			res.status(400).send("unable to get");
		} else {
			res.json(scheduleObj);
		}
	});
}

module.exports.delete = function(req, res){
	// > DELETE /api/lessonSchedule/:id

	LessonSchedule.delete(req.params.id, function(err){
		if (err != null){
			res.json({isSuccessful:false});
		} else {
			res.json({isSuccessful:true});
		}
	});
}

module.exports.update = function(req, res){
	// > PUT /api/lessonSchedule/:id
}
