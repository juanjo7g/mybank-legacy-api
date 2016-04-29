var express = require('express');
var router = express.Router();

// Modelo si se requiere

router.get('/get', function (req, res){
  res.send('Bienvenido al root');
});

router.post('/post', function (req, res){
  console.log(req.body);
  res.send('Ok c:');
});

// getAll,put, delete, update ....

module.exports = router;
