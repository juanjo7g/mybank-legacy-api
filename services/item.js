var express = require('express');
var router = express.Router();

// Modelo si se requiere

router.get('/get', function (req, res){
  var id = req.query.id;
  var nombre = req.query.nombre;
  console.log('Id -> ' + id + '-> ' + nombre);
  res.send('Get item');
});

router.post('/post', function (req, res){
  console.log(req.body);
  res.send('Ok c:');
});

// getAll,put, delete, update ....

module.exports = router;
