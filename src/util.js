var nodemailer = require('nodemailer');
var twilio = require('twilio');
var config = require('../config');
var pg = require('pg');

pg.defaults.ssl = true;

// TODO: Recibir nombre del producto y enviarlo
exports.enviarEmail = function(correo_cliente) {
  console.log("Enviando correo a : " + correo_cliente);
  // Transporte para los correos usando SMTP
  var transporter = nodemailer.createTransport('smtps://' + config.admin.EMAIL + ':' + config.admin.PASSWORD + '@smtp.gmail.com');
  var mailOptions = {
      from: '"My Bank Admin 💰"',
      to: correo_cliente,
      subject: 'Consulta de producto en su cuenta bancaria ✔',
      text: 'Estimado cliente, ha realizado una consulta de los detalles de un producto 💳',
      html: 'Estimado cliente, ha realizado una consulta de los detalles de un producto 💳'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Mensaje enviado: ' + info.response);
  });
}

exports.enviarSMS = function(correo_cliente) {
    console.log("Enviando SMS a : " + correo_cliente);
    var queryGet = 'SELECT celular FROM cliente WHERE correo = \'' + correo_cliente + '\';';
    var URL = config.postgres.URL;
    // Conectando base de datos y ejecutando el query.
    pg.connect(URL, function(err, client){
      if(err) {
        return console.log(err);
      }
      var query = client.query(queryGet, function(err, result){
        if (err){
          client.end();
          return console.log(err);
        }
        console.log('Consuta exitosa.');
        console.log(result.rows[0]);
        var celular;
        if (result.rows[0] == undefined) {
          return console.log('Sin celular');
        }
        celular = result.rows[0].celular;
        client.end();
        if (celular != undefined) {
          console.log('Celular: ' + celular);
          var clientTwilio = new twilio.RestClient(config.twilio.ACCOUNT_SID, config.twilio.AUTH_TOKEN);
          clientTwilio.sms.messages.create({
            to:'+' + celular,
            from: config.twilio.PHONE_NUMBER,
            body:'Estimado cliente, ha realizado una consulta de los detalles de un producto. Att: MyBank'
          }, function(error, message) {
              if (!error) {
                console.log('Enviado! SID para el SMS:');
                console.log(message.sid);
                console.log('Fecha:');
                console.log(message.dateCreated);
              } else {
                console.log('Oops! There was an error.');
                console.log(error);
              }
            });
        }
    });
  });
}
