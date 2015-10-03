var configBootstrap = require('./bootstrap');
var getWebpackPort = require('../utils/getWebpackPort');

var env = process.env;
var PORT = env.PORT || 8080;
var HOST = env.HOST || 'localhost';
var NODE_ENV = env.NODE_ENV || 'development';


var webpackPort = getWebpackPort(PORT);

module.exports = configBootstrap(NODE_ENV, webpackPort, HOST);