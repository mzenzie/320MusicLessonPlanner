var LessonNote = require('../model/lesson-note.js');

module.exports.create = function (req, res) {
	// > POST /api/lessonNote

	/* triggered for every GET /api/lessonNote.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
	console.log("CTRLLER");
	console.log(req.body);
	LessonNote.create({
			notes: req.body.notes,
			date: req.body.date,
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

	LessonNote.get(req.params.id, function(err, noteObj){
		if (err != null){
			res.json({});
		} else {
			res.json(noteObj);
		}
	});
}

module.exports.delete = function(req, res){
	// > DELETE /api/lessonNote/:id

	LessonNote.delete(req.params.id, function(err){
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
