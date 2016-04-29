var express = require('express');
var router = express.Router();
var config = require('./config');

// // Para obtener un token del servidor
// var FirebaseTokenGenerator = require("firebase-token-generator");
// var tokenGenerator = new FirebaseTokenGenerator(config.firebase.SECRET);
// var token = tokenGenerator.createToken({ uid: "uniqueId1", some: "arbitrary", data: "here" });
// console.log('Token generado del servidor: ' + token);
//
var Firebase = require('firebase');
var firebaseRef = new Firebase(config.firebase.URL);

router.get('*', function(req, res, next) {
  token = req.query.tkn;
  if(token == undefined){
    res.send('Sin token');
  } else{
    firebaseRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        res.send('TKN INVALIDO');
        console.log("Login Failed!", error);
      } else {
        console.log("Login Succeeded!", authData);
        next();
      }
    });
  }
});

router.post('*', function(req, res, next) {
  token = req.body.tkn;
  if(token == undefined){
    res.send('Sin token');
  } else{
    firebaseRef.authWithCustomToken(token, function(error, authData) {
      if (error) {
        res.send('TKN INVALIDO');
        console.log("Login Failed!", error);
      } else {
        console.log("Login Succeeded!", authData);
        next();
      }
    });
  }
});

router.use('/api/root',require('./services/root'));
router.use('/api/item',require('./services/item'));

module.exports = router;
