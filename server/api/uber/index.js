'use strict';

var express = require('express');
var controller = require('./uber.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:day/:hour/:type', controller.find);

module.exports = router;