console.log('Inició el Legacy API de MyBank');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var config = require('./config');

app.use(bodyParser.urlencoded({extended: true}));

app.listen(config.web.PORT, function(){
  console.log('Escuchando en el puerto ' + config.web.PORT);
});

app.use('/',require('./routes'));
