// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../../config');
var router = express.Router();
var routes = require('../routes');

pg.defaults.ssl = true;

// Metodo para consultar la información personal como cliente
router.get('/get/:email', function (req, res){
  // Realizando la consulta a la base de datos.
  var email = routes.email;
  if(email == undefined){
    email = req.params.email;
  }

  var queryGet = 'SELECT * FROM cliente WHERE correo = \'' + email + '\';';
  var URL = config.postgres.URL;
  var cliente;

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
      if(result.rows[0]==undefined){
        return res.status(200).json({});
      }
      cliente = result.rows[0];
      client.end();
      return res.status(200).json(cliente);
    });
  });
});

// Metodo para consultar la información personal de un cliente como ejecutivo
router.get('/get/:tipo_doc/:documento', function (req, res){
  // Realizando la consulta a la base de datos.
  var tipo_doc = req.params.tipo_doc;
  var documento = req.params.documento;
  var queryGet = 'SELECT * FROM cliente WHERE LOWER(tipo_doc) = LOWER(\'' + tipo_doc + '\') and documento = \'' + documento + '\';';
  var URL = config.postgres.URL;
  var cliente;

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
      if(result.rows[0]==undefined){
        return res.status(200).json({});
      }
      cliente = result.rows[0];
      client.end();
      return res.status(200).json(cliente);
    });
  });
});

module.exports = router;
