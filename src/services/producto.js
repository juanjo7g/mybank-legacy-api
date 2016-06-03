// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../../config');
var router = express.Router();
var routes = require('../routes');

pg.defaults.ssl = true;

// Obtener productos de un cliente dado el email como cliente
router.get('/get/:email', function (req, res){
  // Realizando la consulta a la base de datos.
  var email = routes.email;
  if(email == undefined){
    email = req.params.email;
  }
  var queryGet = 'SELECT * FROM producto WHERE cliente_correo = \'' + email + '\';';
  var URL = config.postgres.URL;
  var results = [];

  // Conectando base de datos y ejecutando el query.
  pg.connect(URL, function(err, client, done){
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: "ERROR en la base de datos"});
    }
    var query = client.query(queryGet, function(err, result){
      if (err){
        done();
        console.log(err);
        return res.status(400).json({ success: false, data: "ERROR en el query"});
      }
      console.log('Consuta exitosa.');
      client.end();
    });
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.status(200).json(results);
    });
  });
});

// Obtener productos de un cliente como ejecutivo
router.get('/get/:email', function (req, res){
  // Realizando la consulta a la base de datos.
  var email = routes.email;
  
  var queryGet = 'SELECT * FROM producto WHERE cliente_correo = \'' + email + '\';';
  var URL = config.postgres.URL;
  var results = [];

  // Conectando base de datos y ejecutando el query.
  pg.connect(URL, function(err, client, done){
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: "ERROR en la base de datos"});
    }
    var query = client.query(queryGet, function(err, result){
      if (err){
        done();
        console.log(err);
        return res.status(400).json({ success: false, data: "ERROR en el query"});
      }
      console.log('Consuta exitosa.');
      client.end();
    });
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function() {
      done();
      //TODO: Validar que el cliente sea del ejecutivo que hace la consulta
      return res.status(200).json(results);
    });
  });
});

// getAll,put, delete, update ....

module.exports = router;
