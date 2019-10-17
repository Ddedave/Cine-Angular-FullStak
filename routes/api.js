'use strict'

let express = require('express');
let apiController = require('../controllers/api');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

api.post('/test', apiController.test);








module.exports = api;