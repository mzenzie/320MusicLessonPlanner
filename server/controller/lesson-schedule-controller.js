var LessonSchedule = require('../model/lesson-schedule.js');
var StudentRecord = require('../model/student-record.js');

module.exports.create = function(req, res) {
    // > POST /api/lessonSchedule

    /* triggered for every GET /api/lessonSchedule.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
	console.log("LS CTRLLER");
	lessonSchedule = new LessonSchedule(
		{
			date: req.body.date,
			lessonTime: req.body.lessonTime,
			lessonLength: req.body.lessonLength,
			notes: req.body.notes
		});
	studentRecord = new StudentRecord(req.params); // only sid initialized
	console.log(lessonSchedule);
	console.log(req.body);
	lessonSchedule.save(studentRecord, function(err, newSchedule){
		if (err!=null){
			res.status(400).send(err);
		} else {
			res.json(newSchedule);
		}
	});
}; 


module.exports.list = function(req, res) {
    // > GET /api/studentRecord:sid/lessonSchedule
    var sid = req.params.sid;
    if (sid === undefined) {
        res.status(400).send('no sid');
    } else {
        console.log("GETTING SCHEDULE LIST");
        LessonSchedule.list(sid, function(err, schedules) {
            if (err != null || schedules == null) {
                res.status(400).send("unable to list schedule");
            } else {
                console.log(schedules);
                res.json(schedules);
            }
        });
    }
};


module.exports.get = function(req, res){
	// > GET /api/lessonSchedule/:id
	var lsid = req.params.lsid;
	console.log(req.params.sid);
	LessonSchedule.get(lsid, function(err, scheduleObj){
		if (err != null){
			res.status(400).send("unable to get");
		} else {
			res.json(scheduleObj);
		}
	});

}

module.exports.delete = function(req, res) {
    // > DELETE /api/studentRecord/:sid/lessonSchedule/:id
    var lsid = req.params.lsid;
	LessonSchedule.delete(lsid, function(err){
		if (err != null){
			res.json({isSuccessful:false});
		} else {
			res.json({isSuccessful:true});
		}
	});

}

module.exports.update = function(req, res) {
    // > PUT /api/studentRecord/:sid/lessonSchedule/:lsid
    
    var lsid = req.params.lsid;
    var sid  = req.params.sid;
    if (lsid===undefined || sid ===undefined){
    	res.status(400).json({error:"Invalid lsid or sid requested"});
    } else {
	    LessonSchedule.get(lsid, function(err, schedule){
	    	// console.log("SCHEDULE SID="+schedule.sid);
	    	if (schedule.sid != sid){
	    		res.status(400).json({error:"Unable to update. Lesson Schedule doesn't belong to sent SID"});	
	    	} else if (err!=null || schedule==null){
	    		console.log(err);
	    		res.status(400).json({error:"Unable to retrieve LessonSchedule for update"});	
	    	} else {
	    		for (var key in req.body){
	    			if(req.body.hasOwnProperty(key)){
	    				schedule[key] = req.body[key];
	    			} 
	    		}
	    		schedule.update(function(err, newSchedule){
	    			if (err!=null){
	    				res.status(400).json({error:"Unable to update LssonSchedule"});
	    			} else {
	    				res.json(newSchedule);
	    			}
	    		})
	    	}
	    });
    }
}
