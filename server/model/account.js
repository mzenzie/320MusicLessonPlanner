var format = require("string-format");
var dbConnector = require('../../database/dbinit.js');
var bcrypt = require('bcrypt');
var Map = require('collections/map');
var Teacher = require('./teacher.js');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret.js');


var Account = function(jsObject){
	this.username = jsObject.username;
	this.tid = null
	if (jsObject.tid !== undefined){
		this.tid = jsObject.tid;
	}
	this.password = null;
	if (jsObject.password !== undefined){
		this.password = jsObject.password;
	}
}

Account.prototype.save = function(callback){
	var self = this;
	var db = dbConnector.getInstance();
	if (self.tid!=null){
		bcrypt.genSalt(10, function(err, salt){
			bcrypt.hash(self.password, salt, function(err, hash){
				if (err){
					callback(err, null);
				} else {
					self.password = hash;
					PASS = hash;
					insert_query = "INSERT INTO Account (username, password, tid) VALUES ('{0}', '{1}', {2})"
									.format(self.username, self.password, self.tid);
					// console.log(insert_query);
					db.run(insert_query, function(err){
						if (err!=null){
							console.log(err);
							callback(err, null)
						} else {
							callback(null, self);
						}
					});
				}
			});
		})
	} else {
		callback({error: 'must have teacher id'}, null);
	}
}


/* change password / username TO BE IMPLEMENTED*/
// Account.prototype.update = function(tid, callback){
// 	var self = this;
// 	var db = dbConnector.getInstance();
// 	update_query = "UPDATE Account SET Account.tid={0} WHERE Account.username='{1}'"
// 				.format(tid, self.username);
// }


module.exports = Account;

module.exports.hasUsername = function(username, callback){
	var db = dbConnector.getInstance();
	var error = null;
	var get_query = "SELECT * FROM Account WHERE Account.username='{0}'" // checks duplication of username
		.format(username);
	// console.log(get_query);
	db.get(get_query, function(err, row){
		if (err != null){
			console.log(err);
			callback(err, null);
		} else if (row == null){
			callback(null, false);
		} else {
			callback(null, true);
		}
	});

}

module.exports.get = function(username, password, callback){
	var db = dbConnector.getInstance();
	var get_query = "SELECT * FROM Account WHERE Account.username='{0}'"
					.format(username);
	db.get(get_query, function(err, row){
		if (err != null || row == null){
			callback(err, null);
		} else {
			var myAccount = new Account(row);
			bcrypt.compare(password, myAccount.password, function(err, isMatch){
				if (err || !isMatch) {
					console.log(err);
					callback(err, null);
				} else {
					callback(null, myAccount);
				}
			});
		}
	});
};


function fetchToken(auth) {
    // TO BE IMPLEMENTED
    var authInfo = auth.split(' ');
    if (authInfo[0]=='Bearer' && authInfo.length==2){
    	return authInfo[1];
    }
    return null;
}

module.exports.getIDFromToken = function(auth){
	if (auth===undefined) return null;
    var token = fetchToken(auth);
    if (token==null) return null;
    var decoded = jwt.verify(token, secret.secretToken);
    return decoded.id;
}

module.exports.verifyToken = function(req, res, next) {
    // TO BE IMPLEMENTEd
}





