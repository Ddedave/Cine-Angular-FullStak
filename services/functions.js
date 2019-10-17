'use strict'

var configs = require('../configs');

var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');
var secret = configs.keyJWT;

var sanitize = require('mongo-sanitize');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');


let https = require('https');
let c = require('../configs');


function removeFile(file) {
  fs.unlinkSync(file);
  return false;
}


function cO(str){
  if( ObjectId.isValid(str) ){
    return true;
  } else {
    return false;
  }
  return new ObjectId(str);
}


function vC(p , k){
  if (p[k] != undefined && p[k] != null && p[k] != '' ){    
		return true;			
	} else {    
		return false;
	}
}


function generateHeader(path , method , json_payload=''){
	var nonce = new Date().getTime();
	var http_method = method;
	var request_path = "/v3/" + path;
	var Data = nonce+http_method+request_path+json_payload;
	var signature = crypto.createHmac('sha256', configs.BitsoAPI.secret).update(Data).digest('hex');
	var auth_header = "Bitso "+configs.BitsoAPI.key+":" +nonce+":"+signature;
	return auth_header;
}


function decodeToken(token){
	var payload = jwt.decode(token, secret);
	try{
		var payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return '';
		}
	}catch(ex){
		return '';
	}
	return payload;
}

function vS(v){
	return sanitize(v)
}

module.exports = {
  decodeToken,
  generateHeader,
  cO,
  vC,
  vS,
};
