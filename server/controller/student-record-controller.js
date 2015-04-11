var StudentRecord = require('../model/student-record.js');
var Account = require('../model/account.js');



module.exports.create = function(req, res) {
    // > POST /api/studentRecord

    /* triggered for every GET /api/student-record.
		could've just passed req.body to create, but test to see first.
		note** req -> Request, res -> Response
	  */
    var tid = Account.getIDFromToken(req.headers.authorization); 
    if (tid==null) tid = 1; // FOR TESTING 
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
            res.status(400).json({error:"Unable to create StudentRecord"});
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
        StudentRecord.list(tid, function(err, studentRecords) {
            if (err != null) {
                res.status(400).json({error:"Unable to retrieve StudentRecords"});

            } else {
                res.json(studentRecords);
            }
        });
    } else {
        StudentRecord.get(sid, function(err, studentRecord){
            if (err!=null || studentRecord==null){
                res.status(400).json({error:"Unable to retrieve requested StudentRecord"}) // bad request
            } else {
                res.json(studentRecord);
            }
        })
        
    }
};


module.exports.delete = function(req, res) {
    // > DELETE /api/studentRecord/
    var sid = req.query.id;
    if (sid === undefined){
        res.status(400).json({error:"invalid sid requested"});
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

module.exports.update = function(req, res) {
    // > PUT /api/studentRecord/:id
    var sid = req.query.id;
    if(sid === undefined){
        res.status(400).json({error:"invalid sid requested"});
    }else{
<<<<<<< HEAD
        StudentRecord.get(req.query.sid, function(err, studentRecord){
            console.log(studentRecord);
            if(studentRecord == null){
                res.send("Invalid student");
=======
        StudentRecord.get(sid, function(err, studentRecord){
            if(err!=null || studentRecord == null){
                res.status(400).json({error:"unable to retrieve StudentRecord for updating"});
>>>>>>> 11dc72483372a9e9bccf8ef1079e8e6dbacbeb10
            }else{
                 for(var key in req.body){
                    if(req.body.hasOwnProperty(key)){
                        var val = req.body[key];
                        studentRecord[key] = val;
                    }
                }
                studentRecord.update(function(err, studentRecord){
                    if (err!=null){
                        res.status(400).json({error:"unable to update StudentRecord"});
                    } else {
                        res.json(studentRecord);
                    }
                });
            }
        });
    }
}
