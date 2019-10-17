'use strit'


let port = 2900;
let configs = require('../configs');
let app = require('./app');
let mongoose = require('mongoose');
let Promise = require('bluebird');
mongoose.Promise = global.Promise;
Promise.promisifyAll(mongoose); 





mongoose.connect(configs.mongoDB , {useNewUrlParser:true} , async(err , res) => {
	if(err){
		console.log("Error en la db");
		throw err;
	} else {
		console.log("La db esta corriendo normalmente.");
		app.listen(port , async() => {
		  console.log('Servidor de corriendo correctamente');
		});
	}
});


