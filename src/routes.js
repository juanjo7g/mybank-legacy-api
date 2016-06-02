var express = require('express');
var router = express.Router();
var config = require('../config');

// Para obtener un token del servidor
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(config.firebase.SECRET);
var token = tokenGenerator.createToken({ uid: "uniqueId1", some: "arbitrary", data: "here" });
console.log('Token generado del servidor: ' + token);

var Firebase = require('firebase');
var firebaseRef = new Firebase(config.firebase.URL);

var email = '';

// Valida que para todos los metodos get se mande un token valido
router.get('*', function(req, res, next) {
  token = req.query.token;
  if(token == undefined){
    res.status(401).json({ success: false, data: "ERROR token invalido"});
  } else{
    firebaseRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log(error);
        res.status(401).json({ success: false, data: "ERROR token invalido"});
      } else {
        // Se almacena el email relacionado al token
        exports.email = authData.auth.token.email;
        console.log("Login Succeeded!");
        next();
      }
    });
  }
});

// Valida que para todos los metodos post se mande un token valido
router.post('*', function(req, res, next) {
  token = req.body.token;
  if(token == undefined){
    res.status(401).json({ success: false, data: "ERROR token invalido"});
  } else{
    firebaseRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log(error);
        res.status(401).json({ success: false, data: "ERROR token invalido"});
      } else {
        console.log("Login Succeeded!");
        next();
      }
    });
  }
});

router.use('/api/v2/producto', require('./services/producto'));
router.use('/api/v2/cliente', require('./services/cliente'));
router.use('/api/v2/ejecutivo', require('./services/ejecutivo'));
router.use('/api/v2/movimiento', require('./services/movimiento'));

module.exports = router;