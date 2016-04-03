/**
 * Using Rails-like standard namind convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Uber = require('./uber.model');

// Get list of things
exports.index = function(req, res) {
	res.status(200).json([]);
};

// Get list of things
exports.find = function(req, res) {
	var day = String(req.params.day);
	var hour = String(req.params.hour);
	var type = String(req.params.type);
	Uber.find(day, hour, type)
		.then(function(results) {
			res.status(200).json(results);
		})
		.catch(function(err) {
			res.sendStatus(500);
		})
};