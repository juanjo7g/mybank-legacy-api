// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../../config');
var router = express.Router();
var routes = require('../routes');

pg.defaults.ssl = true;

// Metodo para consultar la información personal como ejecutivo
router.get('/get/:tipo_doc/:documento', function (req, res){
  // Realizando la consulta a la base de datos.
  var tipo_doc = req.params.tipo_doc;
  var documento = req.params.documento;
  var queryGet = 'SELECT * FROM ejecutivo WHERE tipo_doc = \'' + tipo_doc + '\' and documento = \'' + documento + '\';';
  var URL = config.postgres.URL;
  var ejecutivo;

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
      ejecutivo = result.rows[0];
      client.end();
      return res.status(200).json(ejecutivo);
    });
  });
});

// Metodo para consultar la información del ejecutivo como cliente
router.get('/get/:email_cliente', function (req, res){
  var email = routes.email;
  if(email == undefined){
    email = req.params.email_cliente;
  }
  var id;
  var ejecutivo;
  var queryGet = 'SELECT ejecutivo_id FROM cliente WHERE correo = \'' + email + '\';';
  var URL = config.postgres.URL;
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
      id = result.rows[0].ejecutivo_id;
      var queryEjecutivo = 'SELECT * FROM ejecutivo WHERE id = ' + id + ';';
      var query = client.query(queryEjecutivo, function(err, result){
        if (err){
          done();
          console.log(err);
          return res.status(400).json({ success: false, data: "ERROR en el query"});
        }
        console.log('Consuta exitosa.');
        if(result.rows[0]==undefined){
          return res.status(200).json({});
        }
        ejecutivo = result.rows[0];
        client.end();
        return res.status(200).json(ejecutivo);
      });
    });
  });
});


module.exports = router;
