var supertest = require("supertest");
var should = require("should");
var config = require('../config');

// Para obtener un token del servidor
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(config.firebase.SECRET);
var token = tokenGenerator.createToken({ uid: "uniqueId1", some: "arbitrary", data: "here" });

var PUERTO = process.env.PORT || 8080;
var server = supertest.agent("http://localhost:" + PUERTO);

describe("Prueba Unitaria routes.js",function(){
  this.timeout(3000);

  it("Prueba metodo GET sin token",function(done){
    server
    .get("/test")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo POST sin token",function(done){
    server
    .post("/test")
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

  it("Prueba metodo GET con token valido",function(done){
    server
    .get("/test?token=" + token)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

  it("Prueba metodo POST con token valido",function(done){
    var body = { token: token };
    server
    .post("/test")
    .type('form')
    .send(body)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

});
