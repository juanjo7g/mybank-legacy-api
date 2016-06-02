// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../../config');
var router = express.Router();
var routes = require('../routes');

pg.defaults.ssl = true;

// Metodo para consultar la información personal como ejecutivo
router.get('/get/:tipo_doc/:documento', function (req, res){
  return res.status(200);
});

module.exports = router;