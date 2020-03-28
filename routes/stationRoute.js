'use strict';
// stationRoute
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

router.get('/limit/:limit?', stationController.station_list_get);

router.get('/id/:id', stationController.station_get);

router.get('/within/:topRight?/:bottomLeft?', stationController.station_get_within);

router.post('/', stationController.station_post);

router.delete('/', stationController.station_delete_id);


module.exports = router;
