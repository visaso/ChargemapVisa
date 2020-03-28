'use strict';
const stationModel = require('../models/station');

const populateFields = {
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
};

const station_list_get = async (req, res) => {
  try {
    console.log('Waiting for stations')
    const stations = await stationModel
      .find()
      .populate(populateFields)
      .limit(parseInt(req.query.limit || 10));
    res.json(stations);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const station_get = async (req, res) => {
  try {
    console.log('Waiting for station')
    console.log(req.params.id)
    const station = await stationModel
      .findById(req.params.id)
      .populate(populateFields);
    res.json(station);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const station_get_within = async (req, res) => {
  try {
    console.log('Waiting for station within area')

    const topRight = JSON.parse(req.query.topRight);
    const bottomLeft = JSON.parse(req.query.bottomLeft);
  
    const topLeft = {
      "lat": topRight.lat,
      "lng": bottomLeft.lng
    };
    const bottomRight= {
      "lat": bottomLeft.lat,
      "lng": topRight.lng
    }
  
    const polygon = {
      "type": "Polygon",
      "coordinates": [[
        [topLeft.lng, topLeft.lat],
        [topRight.lng, topRight.lat],
        [bottomRight.lng, bottomRight.lat],
        [bottomLeft.lng, bottomLeft.lat],
        [topLeft.lng, topLeft.lat]
      ]]
    };
    const station = await stationModel
      .find()
      .populate(populateFields)
      .where('Location')
      .within(polygon);
    res.json(station);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};


const station_post = async (req, res) => {
  const myStation = await stationModel.create({
    Title: 'Testipaikka',
    AddressLine1: 'Tie 12',
    Town: 'Helsinki',
    StateOrProvince: 'Uusimaa',
    Postcode: '00160',
    Connection: Array,
    Location: {
      type: 'Point',
      coordinates: [13, 15]
    }
})
  res.json(myStation.id);
};

const station_delete_id = async (req, res) => {
  const myStation = await stationModel
      .findById("5e7f2d4f44a757259476d9d2").remove();
  res.json(myStation.id);
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_get_within,
  station_delete_id
};
