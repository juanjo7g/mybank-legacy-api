// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../../config');
var router = express.Router();
var routes = require('../routes');

pg.defaults.ssl = true;

// Metodo para consultar la lista de movimientos dado el id del producto
router.get('/get/:producto_id', function (req, res){
  return res.status(200);
});

// Metodo para los detalles de un movimiento dado el id del movimiento
router.get('/get/:id', function (req, res){
  return res.status(200);
});

module.exports = router;