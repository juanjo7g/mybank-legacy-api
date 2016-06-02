// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../../config');
var router = express.Router();
var routes = require('../routes');

pg.defaults.ssl = true;

// Metodo para consultar la información personal como cliente
router.get('/get/:email', function (req, res){
  return res.status(200);
});

// Metodo para consultar la información personal de un cliente como ejecutivo
router.get('/get/:tipo_doc/:documento', function (req, res){
  return res.status(200);
});

module.exports = router;