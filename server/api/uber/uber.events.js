/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var UberEvents = require('./uber.events');
var redisClient = require('../../config/redis').redisClient;
var Promise = require('bluebird');

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('uber:' + event, socket);
    UberEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return () => {
    UberEvents.removeListener(event, listener);
  };
}