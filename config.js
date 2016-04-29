var config = {};

config.web = {};
config.firebase = {};

config.web.PORT = process.env.WEB_PORT || 8080;

// Firebase para pruebas:
// config.firebase.URL = "https://mybank-pruebas.firebaseio.com/";
// config.firebase.SECRET = "NuSJXKMDgJeCymeX5tjLu5GkjETrL257eBBQEGMq";

// Firebase producción:
config.firebase.URL = "https://mybankapp.firebaseio.com/";
config.firebase.SECRET = "Iz0jgNOaHJyBeQaQdQgU95UctzutLhzKXg8sUf0g";

module.exports = config;
