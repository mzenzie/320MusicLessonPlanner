var StudentRecord = require('../model/student-record.js');
var Account = require('../model/account.js');



module.exports.create = function(req, res) {
    // > POST /api/studentRecord

    /* triggered for every GET /api/student-record.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
    console.log("CTRLLER");
    console.log(req.body);
    var tid = Account.getIDFromToken(req.headers.authorization); 
    if (tid==null) tid = 1; // FOR TESTING 
    console.log("TID FOR INSERTION ======================== " + tid);
    StudentRecord.create(   
        {
            tid       : tid,
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
            email     : req.body.email,
            instrument: req.body.instrument,
            address   : req.body.address,
            phone     : req.body.phone,
            birthday  : req.body.birthday,
            startDate : req.body.startDate,
            lessonTime: req.body.lessonTime,
            lessonLength: req.body.lessonLength,
            numberOfLessons: req.body.numberOfLessons,
            generalNotes   : req.body.generalNotes    
        }
    , function(err, newStudentRecord) {
        if (err != null) {
            res.json({});
        } else {
            res.json(newStudentRecord);
        }
    });
};



module.exports.get = function(req, res) {
    // > GET /api/studentRecord

    // var sess = req.session;
    // var id = sess.id; // to be implemented...
    var sid = req.query.id;
    var tid = Account.getIDFromToken(req.headers.authorization); 
    if (tid==null) tid = 1;
    if (sid === undefined){
        //list
        console.log("TID+======"+tid);
        StudentRecord.list(tid, function(err, studentRecords) {
            if (err != null) {
                res.status(400).send("error listing studentRecords");
            } else {
                res.json(studentRecords);
            }
        });
    } else {
        StudentRecord.get(sid, function(err, studentRecord){
            if (err!=null || studentRecord==null){
                res.status(400).send("couldn't find StudentRecord") // bad request
            } else {
                console.log("Retrieving studentRecord's lesson schedule");
                res.json(studentRecord);
            }
        })
        
    }
};


module.exports.delete = function(req, res) {
    // > DELETE /api/studentRecord/
    var sid = req.query.id;
    if (sid === undefined){
        res.status(400).send("invalid sid");
    } else {
        StudentRecord.delete(sid, function(err) {
            if (err != null) {
                res.json({
                    isSuccessful: false
                });
            } else {
                res.json({
                    isSuccessful: true
                });
            }
        });
    }
}

/*
NEED TO RECODE PRIMARY KEY FROM EMAIL, INSTRUMENT to 
*/

module.exports.update = function(req, res) {
    // > PUT /api/studentRecord/:id
    if(req.query.sid === undefined){
        res.status(400).send("invalid sid");
    }else{
        StudentRecord.get(req.query.sid, function(err, studentRecord){
            if(studentRecord == null){
                res.send("Invalid sid");
            }else{
            
                 for(var key in req.body){
                    if(req.body.hasOwnProperty(key)){
                        var val = req.body[key];
                        studentRecord[key] = val;
                    }
                }
                studentRecord.update(function(err, studentRecord){
                    if (err!=null){
                        res.status(400).send("unable to update StudentRecord");
                    } else {
                        res.status(200).send(studentRecord);
                    }
                });
            }
        });
    }

//email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, birthday DATE, instrument TEXT, generalNotes 
    /*
    if (req.query.email === undefined || req.query.instrument === undefined){
        req.status(400).send("invalid email, instrument");
    } else {
        StudentRecord.get(req.query.email, req.query.instrument, function(err, studentRecord){
            if (studentRecord==null){
                res.status(400).send("invalid email, instrument");
            } else {
                if (req.body.firstName !== undefined){
                    studentRecord.firstName = req.body.firstName;
                }
                if (req.body.lastName !== undefined){
                    studentRecord.lastName = req.body.lastName;
                }
                studentRecord.update(function(err, _student){
                    if (err!=null){
                        res.status(400).send("unable to update StudentRecord");
                    } else {
                        res.status(200).send(_student);
                    }
                });
            }
        })
    }*/

}
