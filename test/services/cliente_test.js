var supertest = require("supertest");
var should = require("should");
var config = require('../../config');

// Para obtener un token del servidor
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(config.firebase.SECRET);
var token = tokenGenerator.createToken({ uid: "uniqueId1", some: "arbitrary", data: "here" });

var PUERTO = process.env.PORT || 8080;
var server = supertest.agent("http://localhost:" + PUERTO);

describe("Prueba Unitaria services/cliente.js",function(){
  this.timeout(5000);

  it("Prueba metodo get cliente por correo con token valido como cliente",function(done){
    server
    .get("/api/v2/cliente/get/email@test.com?token=" + token)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Prueba metodo get cliente por correo con token invalido como cliente",function(done){
    server
    .get("/api/v2/cliente/get/email@test.com?token=123")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo get cliente por tipo de documento y documento con token invalido como ejecutivo",function(done){
    server
    .get("/api/v2/cliente/get/td/123?token=" + token)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Prueba metodo get cliente por tipo de documento y documento con token invalido como ejecutivo",function(done){
    server
    .get("/api/v2/cliente/get/td/123?token=123")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

});
