/* eslint no-console: 0 */

/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


const path = require('path');
const http = require('http');
const express = require('express');

const config = require('./config/environment');

// Setup server
var app = express();
var server = http.createServer(app);

  var io = require('socket.io')(server);

require('./config/socketio')(io);
require('./config/express')(app);
require('./routes')(app);


// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;