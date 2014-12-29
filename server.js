// Simple Node / Express server to serve static pages
var express = require('express');
var bodyParser = require('body-parser');
var proxy = require('./server/authProxy');
var error = require('./server/errorHandler');

var app = express();
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/proxy', proxy.verifyUser);
app.use(error.errorHandler);

app.listen(process.env.PORT || '8080');
console.log('Server is listening.');

module.exports = app;