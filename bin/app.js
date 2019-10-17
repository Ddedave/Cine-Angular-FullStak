'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Ddos = require('ddos');
var ddos = new Ddos({burst:10, limit:15});


//Cargar Routers
var api_routes = require('../routes/api');




app.use(bodyParser.urlencoded({ limit: '60mb', extended: true }));
app.use(bodyParser.json({ limit: '60mb', extended: true }));

//app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
//app.use(bodyParser.json({limit: '10mb', extended: true}));


//app.use(ddos.express);



app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin , X-Requested-With , Content-Type , Accept , Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT , DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT , DELETE');
    next();
});




//Rutas Base
app.use('/api', api_routes);


//Errores 404
app.get('*', function(req, res){
    res.status(500).send({status:false , msg:'ERROR'});
});

app.post('*', function(req, res){
    res.status(500).send({status:false , msg:'ERROR1'});
});

app.put('*', function(req, res){
    res.status(500).send({status:false , msg:'ERROR'});
});

app.delete('*', function(req, res){
    res.status(500).send({status:false , msg:'ERROR'});
});



module.exports = app;