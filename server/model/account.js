var format = require("string-format");
var dbConnector = require('../../database/dbinit.js');
var bcrypt = require('bcrypt');
var Map = require('collections/map');



var Account = function(jsObject){
	this.pid = jsObject.pid || null;
	this.username = jsObject.username;
	this.password = jsObject.password;
}

var __accounts = new Map();

bcrypt.genSalt(10, function(err, salt){
	bcrypt.hash('1234', salt, function(err, hash){
		if (err){
			console.log(err);
		} else {
			var stub1 = new Account({pid:1, username:'admin@g.com', password:hash});
			__accounts.set(stub1.username, stub1);
			console.log(__accounts.get('admin@g.com'));
		}
	});
});


Account.prototype.save = function(callback){
	__accounts.set(this.username, this);
	console.log("=====>"+__accounts.length);
	this.pid = __accounts.length;
	console.log(this);
	callback(null, this);
}

module.exports.create = function(jsObject, callback){
	if (__accounts.has(jsObject.username)){
		callback({message:"duplicate username"}, null);
	}

	var myAccount = new Account({
		username: jsObject.username,
		password: jsObject.password
	});

	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(myAccount.password, salt, function(err, hash){
			if (err){
				callback(err, null);
			} else {
				myAccount.password = hash;
				myAccount.save(callback);
			}
		});
	})
};

module.exports.get = function(username, password, callback){
	var myAccount = __accounts.get(username);
	console.log(myAccount);
	if (myAccount === 'undefined'){
		callback({messsage:"invalid username/pasword"}, null);
	} else {
		console.log("USER found");
		bcrypt.compare(password, myAccount.password, function(err, isMatch){
			if (err || !isMatch) {
				console.log(err);
				callback(err, null);
			} else {
				callback(null, myAccount);
			}
		});
	}

};