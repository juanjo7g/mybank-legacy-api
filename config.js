var config = {};

// Inicializando arreglos.
config.web = {};
config.firebase = {};
config.postgres = {};
config.admin = {};
config.twilio = {};

config.web.PORT = process.env.WEB_PORT || 8080;

// Firebase para pruebas:
// config.firebase.URL = "https://mybank-pruebas.firebaseio.com/";
// config.firebase.SECRET = "NuSJXKMDgJeCymeX5tjLu5GkjETrL257eBBQEGMq";

// Firebase para pruebas IONIC:
// config.firebase.URL = "https://mybankatom.firebaseio.com/";
// config.firebase.SECRET = "lYUPmUzN7lQJyUWwgYMtd3kJdcwcscF8s6P81Gv6";

// Firebase producción:
config.firebase.URL = "https://mybankapp.firebaseio.com/";
config.firebase.SECRET = "Iz0jgNOaHJyBeQaQdQgU95UctzutLhzKXg8sUf0g";

// Postgres producción:
config.postgres.URL = "postgres://jvmxzymhrluxqy:zceP-nVFulfhGbTPIRhe3hD2EZ@ec2-23-21-112-245.compute-1.amazonaws.com:5432/ddb2ed3sj3c8v3";

// Credenciales email admin:
config.admin.EMAIL = "mybank.legacyapi@gmail.com";
config.admin.PASSWORD = "IIpnnsa7LnbQwUO";

// Twilio producción:
config.twilio.ACCOUNT_SID = "AC7a68bb37b24dea90ad614605d12e1f9d";
config.twilio.AUTH_TOKEN = "5557432bf68cda9242c72fafb58accc3";
config.twilio.PHONE_NUMBER = "+12054099328"

module.exports = config;
