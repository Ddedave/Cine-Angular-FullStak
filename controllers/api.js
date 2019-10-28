'use strict'

var f = require('../services/functions');
var Clients = require('../models/clients');


async function test(req, res) {
    let b = req.body;
    console.log(req.body);
    if (f.vC(b, 'nombre') &&  f.vC(b, 'email') && f.vC(b, 'id_cliente') && f.vC(b, 'fecha_nac') && f.vC(b, 'categoria')) {
        let nombre = f.vS(b.nombre);
        let id_cliente_ = f.vS(b.id_cliente);
        let fecha_nac_ = f.vS(b.fecha_nac);
        let categoria = f.vS(b.categoria);
        let email_ = f.vS(b.email);

        let clients= new Clients();
        clients.nombre = nombre;
        clients.id_cliente = id_cliente_;
        clients.fecha_nacimiento = fecha_nac_;
        clients.correo = email_;
        clients.categoria= categoria;
        await clients.save(async (err, clientsSaved) => {
        if (err) {
           console.log(err);
           res.status(500).send({ status: false, msg: 'Error, client could not be created' }); 
    	} else {
    	   res.status(200).send({ status: true, msg: 'Transaction registered successfully', data: clientsSaved }); 
    	   }
    	});
    } else {
      console.log(b)
      res.status(400).send({ status: false, msg: 'missing fields' });
    }
}

module.exports = {    
    test,
};