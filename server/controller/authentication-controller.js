var Account = require('../model/account.js');
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


function fetchToken(req) {
    // TO BE IMPLEMENTED
}

module.exports.verifyToken = function(req, res, next) {
    // TO BE IMPLEMENTEd
}

module.exports.signin = function(req, res) {
    if (req.body.username == '' || req.body.password == '') {
        res.send(401);
    }

	Account.get(req.body.username, req.body.password, function(err, myAccount){
		if (err != 'null'){
			console.log("RECIEVED MYACCOUNT @ AUTHEN CONTROLLER");
			console.log(myAccount);
			var _token = jwt.sign({id: myAccount.pid}, 
								secret.secretToken, 
								{ expiresInMinutes: TOKEN_EXPIRATION });
			console.log(_token);
			res.json({token:_token});
		} else {
			console.log(err);
			res.send(401);
		}
	})

}
module.exports.signout = function(req, res) {
    if (req.user) {
        // remove from redis storage
        res.send(200);
    } else {
        res.send(401);
    }
}

module.exports.signup = function(req, res) {
    console.log("SIGN UP");
    if (req.body.username == '' || req.body.password == '') {
        res.send(401);
    }

    Account.create({
        username: req.body.username,
        password: req.body.password
    }, function(err, myAccount) {
        if (err != 'null') {
            var _token = jwt.sign({
                    id: myAccount.pid
                },
                secret.secretToken, {
                    expiresInMinutes: TOKEN_EXPIRATION
                });
            res.json({
                token: _token
            });
        } else {
            console.log(err);
            res.send(401);
        }
    })
}
