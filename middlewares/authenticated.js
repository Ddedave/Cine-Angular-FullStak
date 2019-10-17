'use strict'
 
var jwt = require('jwt-simple');
var moment = require('moment');
var configs = require('../configs');
var secret = configs.keyJWT;

// var Usuarios = require('../models/usuarios');
// var Accesos = require('../models/accesos');
var f = require('../services/functions');




function randomInt(min,range) {
	return Math.floor((Math.random()*(range+1))+min)
}

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(500).send({status:false , msg:'NOHEADER' , error_token:true});
	}
	var token = req.headers.authorization.replace(/['"]+/g, '');
	try{
		var payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return res.status(500).send({status:false , msg:'TOKENEXPIRED' , error_token:true});
		}
	}catch(ex){
		return res.status(500).send({status:false , msg:'TOKENINVALID' , error_token:true});
	}
	if (req.headers['user-agent']) {
		//
	} else {
		return res.status(500).send({status:false , msg:'USERAGENT' , error_token:true});
	}
	let ip = f.vS(f.getIP(req));
	let ua = f.vS(f.getUA(req));
	let lang = f.vS(f.getLang(req));
	req.user = payload;
	next();
	/*
	Accesos.findOne({id_usuario:payload.sub , status:true , ip:ip , user_agent:ua , token:token} , async(err , accsFind) => {
		if(err){
			return res.status(500).send({status:false , msg:'TOKENINVALID' , error_token:true});
		} else {
			if(accsFind){
				let r = randomInt(0,9);
				if( r === 5 ){
					Accesos.findByIdAndUpdate(accsFind._id , {fecha_use:new Date().getTime()} , (err , userUpdate) => {});
				}
				if( r === 6 ){
					Usuarios.findByIdAndUpdate(payload.sub , {lang:lang} , (err , userUpdate) => {});
				}
				req.user = payload;
				next();
			} else {
				return res.status(500).send({status:false , msg:'TOKENINVALID' , error_token:true});
			}
		}
	});
	*/


};