// Obteniendo los modulos necesarios.
var express = require('express');
var pg = require('pg');
var config = require('../config');
var router = express.Router();
var routes = require('../routes');

pg.defaults.ssl = true;

router.get('/getByEmail', function (req, res){
  // Realizando la consulta a la base de datos.
  var email = routes.email;
  var queryGet = 'SELECT name, type, balance FROM product WHERE email_client = \'' + email + '\';';
  var URL = config.postgres.URL;
  var results = [];

  console.log(queryGet); // Verificando el query

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

// getAll,put, delete, update ....

module.exports = router;
