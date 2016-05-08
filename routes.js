var express = require('express');
var router = express.Router();
var config = require('./config');

// Para obtener un token del servidor
// var FirebaseTokenGenerator = require("firebase-token-generator");
// var tokenGenerator = new FirebaseTokenGenerator(config.firebase.SECRET);
// var token = tokenGenerator.createToken({ uid: "uniqueId1", some: "arbitrary", data: "here" });
// console.log('Token generado del servidor: ' + token);

var Firebase = require('firebase');
var firebaseRef = new Firebase(config.firebase.URL);

var email = '';

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
        console.log("Login Succeeded!", authData);
        next();
      }
    });
  }
});

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
        console.log("Login Succeeded!", authData);
        next();
      }
    });
  }
});

router.use('/api/root',require('./services/root'));
router.use('/api/item',require('./services/item'));
router.use('/api/product', require('./services/product'));

module.exports = router;
