// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../../config');
var router = express.Router();
var routes = require('../routes');
var util = require('../util');

pg.defaults.ssl = true;

// Metodo para consultar la lista de movimientos dado el id del producto como cliente
router.get('/get/:producto_id/:email', function (req, res){
  var producto_id = req.params.producto_id;

  var email = routes.email;
  if(email == undefined){
    email = req.params.email;
  }
  var queryGet = 'SELECT * FROM movimiento WHERE producto_id = \'' + producto_id + '\';';
  var URL = config.postgres.URL;
  var results = [];

  // Conectando base de datos y ejecutando el query.
  pg.connect(URL, function(err, client, done){
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: "ERROR en la base de datos"});
    }
    var queryMovimientos = client.query(queryGet, function(err, result){
      if (err){
        done();
        console.log(err);
        client.end();
        return res.status(400).json({ success: false, data: "ERROR en el query"});
      }
      console.log('Consuta exitosa.');

    });
    queryMovimientos.on('row', function(row){
      results.push(row);
    });
    queryMovimientos.on('end', function() {
      // Se obtiene el correo del cliente del producto
      queryGet = 'SELECT cliente_correo FROM producto WHERE id = \'' + producto_id + '\';';
      var queryCliente = client.query(queryGet, function(err, result){
        if (err){
          done();
          console.log(err);
          client.end();
          return res.status(400).json({ success: false, data: "ERROR en el query"});
        }
        console.log('Consulta exitosa.');
        console.log('Cliente asociado al movimiento ', result.rows[0]);
        // Se verificar que el producto sea del cliente
        if (result.rows[0] != undefined && email != result.rows[0].cliente_correo) {
          done();
          client.end();
          return res.status(401).json({ success: false, data: "Email invalido"});
        }
        if (results!=[]) {
          util.enviarEmail(email);
          util.enviarSMS(email);
        }
        done();
        client.end();
        return res.status(200).json(results);
      });
    });
  });
});

// Metodo para la lista de productos de un cliente como ejecutivo
router.get('/get/:producto_id', function (req, res){
    var producto_id = req.params.producto_id;
    
    var queryGet = 'SELECT * FROM movimiento WHERE producto_id = \'' + producto_id + '\';';
    var URL = config.postgres.URL;
    var results = [];

    // Conectando base de datos y ejecutando el query.
    pg.connect(URL, function(err, client, done){
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: "ERROR en la base de datos"});
      }
      var queryMovimientos = client.query(queryGet, function(err, result){
        if (err){
          done();
          console.log(err);
          client.end();
          return res.status(400).json({ success: false, data: "ERROR en el query"});
        }
        console.log('Consuta exitosa.');
      });
      queryMovimientos.on('row', function(row){
        results.push(row);
      });
      queryMovimientos.on('end', function() {
        //TODO: Validar que el producto sea de un cliente asignado al ejecutivo
        done();
        return res.status(200).json(results);
      });
    });
});

module.exports = router;
