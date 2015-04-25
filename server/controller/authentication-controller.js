var Account = require('../model/account.js');
var Teacher = require('../model/teacher.js');
var redis = require('redis');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret.js');
// var redisClient = redis.createClient(6379);
var TOKEN_EXPIRATION = 60 * 5;


module.exports.startRedisServer = function() {
    redisClient.on('error', function(err) {
        console.log(err);
    });

    redisClient.on('connect', function() {
        console.log('Redis started at ' + 6379 + 'ᕙ༼*◕_◕*༽ᕤ');
    });
}


module.exports.signin = function(req, res) {
    if (req.body.username == '' || req.body.password == '') {
        res.send(400);
    }
	Account.get(req.body.username, req.body.password, function(err, myAccount){
		if (err != null || myAccount == null){
            console.log(err);
			res.status(400).json({error:"Incorrect Username/Password. Please try again."})
        } else {
            console.log("RECIEVED MYACCOUNT @ AUTHEN CONTROLLER");
            console.log(myAccount);
            var _token = jwt.sign({id: myAccount.tid}, 
                                secret.secretToken, 
                                { expiresInMinutes: TOKEN_EXPIRATION });
            console.log(_token);
            res.json({token:_token});
		}
	})

}
module.exports.signout = function(req, res) {
    if (req.user) {
        // remove from redis storage
    }
    res.send(200);
}

module.exports.signup = function(req, res) {
    console.log("SIGN UP");
    if (req.body.username == '' || req.body.password == '' || req.body.username === undefined || req.body.password === undefined) {
        res.status(400).json({error:"Incomplete Username/Password fields."});
    } else{
        Account.hasUsername(req.body.username, function(err, hasUsername){
            if (hasUsername){
                res.status(400).json({error:"Username exists"});
            } else {
                var teacher = new Teacher({email:req.body.username,firstName:req.body.firstName});
                teacher.save(function(err, teacher){
                    if (err!=null || teacher==null){
                        res.status(400).json({error:"Unable to save Teacher Profile"});
                    } else {
                        var account = new Account({username: req.body.username, password: req.body.password, tid: teacher.tid});
                        account.save(function(err, account){
                            if (err!=null|| account==null){
                                res.status(400).json({error:"Unable to create Account"});
                            } else {
                                var _token = jwt.sign({
                                        id: account.tid
                                    },
                                    secret.secretToken, {
                                        expiresInMinutes: TOKEN_EXPIRATION
                                    }
                                );
                                res.json({
                                    token: _token
                                });
                            }
                        });
                    }
                })
            }
        })
        
    }
}
