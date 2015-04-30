var jwt = require('jsonwebtoken');
var secret = require('../server/config/secret.js');
module.exports.createToken = function(id){
	var token = jwt.sign(
		{id: id},
		secret.secretToken,
		{expiresInMinutes: 60000}						 
	);
	return "Bearer "+token;
}