/**
 * Broadcast updates to client when the model changes
 */

'use strict';

'use strict';
var config = require('../../config/environment');

var EventEmitter = require('events').EventEmitter;
var Uber = require('./uber.model');
var UberEvents = new EventEmitter();
var Promise = require('bluebird');

var r = require('rethinkdb');
var assert = require('assert');
var connection = null;

// Set max event listeners (0 == unlimited)
UberEvents.setMaxListeners(0);

/**
 * A wrapper function for the RethinkDB API `r.connect`
 * to keep the configuration details in a single function
 * and fail fast in case of a connection error.
 */

function onConnect(callback) {
  r.connect({
    host: config.dbConfig.host,
    port: config.dbConfig.port,
    db: config.dbConfig.db
  }, function(err, connection) {
    assert.ok(err === null, err);
    connection._id = Math.floor(Math.random() * 10001);
    callback(err, connection);
  });
}

// Model events to emit
var events = ['save', 'remove'];

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  onConnect(function(err, connection) {
    r.table('uber')
      .changes()
      .run(connection, function(err, cursor) {
        if (err) return

        cursor.on('error', function(error) {
          console.error('err: ', error);
        })

        cursor.on('data', function(event) {
          if (!event.new_val) emitEvent('remove', event.old_val);
          if (!event.old_val) emitEvent('save', event.new_val)
          if (event.old_val && event.new_val) emitEvent('save', event.new_val)
        })
      });
  })
}

function emitEvent(event, doc) {
  UberEvents.emit(event, doc);

}

module.exports = UberEvents;