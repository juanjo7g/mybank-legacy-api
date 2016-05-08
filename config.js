var config = {};

// Inicializando arreglos.
config.web = {};
config.firebase = {};
config.postgres = {};

config.web.PORT = process.env.WEB_PORT || 8080;

// Firebase para pruebas:
// config.firebase.URL = "https://mybank-pruebas.firebaseio.com/";
// config.firebase.SECRET = "NuSJXKMDgJeCymeX5tjLu5GkjETrL257eBBQEGMq";

// Firebase para pruebas:
config.firebase.URL = "https://mybankatom.firebaseio.com/";
config.firebase.SECRET = "lYUPmUzN7lQJyUWwgYMtd3kJdcwcscF8s6P81Gv6";

// Firebase producción:
// config.firebase.URL = "https://mybankapp.firebaseio.com/";
// config.firebase.SECRET = "Iz0jgNOaHJyBeQaQdQgU95UctzutLhzKXg8sUf0g";

// Postgres producción:
config.postgres.URL = "postgres://jvmxzymhrluxqy:zceP-nVFulfhGbTPIRhe3hD2EZ@ec2-23-21-112-245.compute-1.amazonaws.com:5432/ddb2ed3sj3c8v3";

module.exports = config;
