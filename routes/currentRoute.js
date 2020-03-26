'use strict';
// currentRoute
const express = require('express');
const router = express.Router();
const currentController = require('../controllers/currentController');

router.get('/', currentController.current_list_get);

router.get('/:id', currentController.current_get);

router.post('/', currentController.current_post);

module.exports = router;
