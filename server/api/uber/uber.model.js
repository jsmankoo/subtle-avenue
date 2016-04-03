'use strict';

var config = require('../../config/environment');
var r = require('rethinkdb');
var assert = require('assert');
var connection = null;
var Promise = require('bluebird');

// #### Helper functions
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

module.exports = {


	/*
	 * Insert a message
	 */

	find: function(day, hour, type) {
// console.log(day, hour, type)
		return new Promise(function(resolve, reject) {
			onConnect(function(err, connection) {
				r.table('uber')
					.filter({
						dayOfWeek: day,
						hourOfDay: hour,
						Type: type
					})
					.run(connection)
					.then(function(cursor) {
						cursor.toArray(function(err, row) {
							resolve(row);
						});
					})
					.error(function(err) {
						reject(err);
					})
					// .finally(function() {
					// 	connection.close();
					// });
			});
		})
	}




}