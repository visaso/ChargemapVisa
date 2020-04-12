// Router
'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);
router.get('/:id', userController.user_get);

router.post('/', userController.log_form);
router.post('/create', userController.create_user);


module.exports = router;



