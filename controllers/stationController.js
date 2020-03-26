'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
  try {
    console.log('Waiting for stations')
    const stations = await stationModel
    .find()
   .populate({
     path: 'Connections',
     model: 'Connection',

     populate: [{
      path: 'ConnectionTypeID',
      model: 'ConnectionType'
  },{
      path: 'LevelID',
      model: 'Level'
  }, {
      path: 'CurrentTypeID',
      model: 'CurrentType'
  }],
   })
    res.json(stations);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const station_get = async (req, res) => {
  try {
    console.log('Waiting for station')
    const station = await stationModel
    .findById(req.params.id)
   .populate({
     path: 'Connections',
     model: 'Connection',

     populate: [{
      path: 'ConnectionTypeID',
      model: 'ConnectionType'
  },{
      path: 'LevelID',
      model: 'Level'
  }, {
      path: 'CurrentTypeID',
      model: 'CurrentType'
  }],
   })
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
