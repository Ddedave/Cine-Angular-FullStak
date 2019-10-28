'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

var ClientSchema = Schema({    
    nombre: { type: String },
    id_cliente: { type: Number },
    fecha_nacimient: { type:String},
    correo: { type: String },
    categoria: { type: String, default: "Fan" },    
});

ClientSchema.index({ status: 1 });
ClientSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Clients', ClientSchema);