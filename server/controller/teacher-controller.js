var Teacher = require('../model/teacher.js');
var Account = require('../model/Account.js');

module.exports.create = function(req, res) {
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
    }, function(err, newTeacher) {
        if (err != null) {
            res.json({});
        } else {
            res.json(newTeacher);
        }
    });
};


module.exports.get = function(req, res) {
    // > GET /api/teacher/
    // var tid = req.query.id; //for testing
    var tid = Account.getIDFromToken(req.headers.authorization)
    console.log(tid);
    if (tid===undefined || tid == null){
        Teacher.list(function(err, teachers){
            if (err!=null){
                res.send(400);
            } else {
                res.json(teachers);
            }
        });
    } else {
        Teacher.get(tid, function(err, teacher) {
            if (err != null) {
                res.send(400);
            } else {
                console.log(teacher);
                res.json(teacher);
            }
        });
    }
}

module.exports.delete = function(req, res) {
    // > DELETE /api/teacher/:id
    Teacher.delete(req.params.id, function(err) {
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

module.exports.update = function(req, res) {
    // > PUT /api/teacher/:id
}
