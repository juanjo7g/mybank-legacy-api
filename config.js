var config = {};

config.web = {};
config.firebase = {};

config.web.PORT = process.env.WEB_PORT || 8080;
config.firebase.URL = "https://mybank-pruebas.firebaseio.com/";
config.firebase.SECRET = "NuSJXKMDgJeCymeX5tjLu5GkjETrL257eBBQEGMq";

module.exports = config;
