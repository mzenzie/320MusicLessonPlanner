var StudentRecord = require('../model/lesson-note.js');

module.exports.create = function (req, res) {
	// > POST /api/lessoNote

	/* triggered for every GET /api/lesson-note.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
	console.log("CTRLLER");
	console.log(req.body);
	StudentRecord.create({
			notes: req.body.notes,
			date: req.body.date,
			nid: req.body.email,
		}, function(err, newNote){
			if (err!=null){
				res.json({});
			} else {
				res.json(newNote);
			}
		});
}; 

module.exports.list = function (req, res) {
	// > GET /api/lessonNote

	var id = 1; // stub code
	LessonNote.list(1, function(err, noteList){
		if (err!=null){
			res.json({});
		} else {
			res.json(noteList);
		}
	});
};

module.exports.get = function(req, res){
	// > GET /api/lessonNote/:id

	Teacher.get(req.params.id, function(err, noteObj){
		if (err != null){
			res.json({});
		} else {
			res.json(noteObj);
		}
	});
}

module.exports.delete = function(req, res){
	// > DELETE /api/lessonNote/:id

	StudentRecord.delete(req.params.id, function(err){
		if (err != null){
			res.json({isSuccessful:false});
		} else {
			res.json({isSuccessful:true});
		}
	});
}

module.exports.update = function(req, res){
	// > PUT /api/lessonNote/:id
}
