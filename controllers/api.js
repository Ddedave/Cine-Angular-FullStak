'use strict'

var f = require('../services/functions');
var Clients = require('../models/clients');


async function test(req, res) {
    let b = req.body;
    if (f.vC(b, 'post')) {                
        let id_postclient = f.vS(b.post);
        console.log(post)
        res.status(200).send({ status: true, msg: 'Enter' });
    } else {
        res.status(400).send({ status: false, msg: 'missing fields' });
    }
}

module.exports = {    
    test,
};