'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
  try {
    console.log('Waiting for stations')
    const stations = await stationModel.find()
    console.log(stations);
    res.json(stations);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const station_get = async (req, res) => {
  try {
    console.log('Waiting for station')
    const station = await stationModel.findById(req.params.id);
    console.log(station);
    res.json(station);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const station_post = (req, res) => {
  res.send('With this endpoint you can add stations');
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
};
