'use strict'
 
var jwt = require('jwt-simple');
var moment = require('moment');
var configs = require('../configs');
var secret = configs.keyJWT;



exports.createToken = function(user){
	try{
		var payload = {
			sub: user._id,
			slug: user.slug,
			uuid: user.uuid,
			nombre: user.nombre,
			apellido: user.apellido,
			email: user.email,
			status: user.status,
			nivel: user.nivel,
			check: user.check,
			auth_code: user.auth_code,
			auth_status: user.auth_status,
			push_code: user.push_code,
			iat: moment().unix(),
			exp: moment().add(30 , 'days').unix
		};
		return jwt.encode(payload , secret);
	} catch(err){
		return null;
	}
};
