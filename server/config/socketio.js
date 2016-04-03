/**
 * Socket.io configuration
 */

'use strict';

//var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
  // Presence.leave(socket.decoded_token.id, socket.id);
}

// When the user connects.. perform this
function onConnect(socket, io) {


  // Insert sockets below
  require('../api/uber/uber.socket').register(socket);
}

module.exports = function(io) {
  // Authenticate socket.io users and access their token through socket.handshake.decoded_token

  io.on('connection', function(socket) {

    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;
    socket.connectedAt = new Date();

    // socket.log = function(...data) {
    //   console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    // };

    socket.on('ping', () => {
      socket.emit('pong');
    });

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });
    // Call onConnect.
    onConnect(socket, io);
    //socket.log('CONNECTED');
  });
};