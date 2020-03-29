'use strict';
// stationRoute
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const passport = require('../utils/pass.js')

router.get('/limit/:limit?', stationController.station_list_get);

router.get('/id/:id', stationController.station_get);

router.get('/within/:topRight?/:bottomLeft?', stationController.station_get_within);

router.post('/', passport.authenticate('jwt', {session: false}), stationController.station_post);

router.delete('/', passport.authenticate('jwt', {session: false}), stationController.station_delete_id);

router.put('/', passport.authenticate('jwt', {session: false}), stationController.station_update_put);


module.exports = router;
