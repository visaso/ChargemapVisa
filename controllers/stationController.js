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
console.log(req.body)
  const myStation = await stationModel.create({
    Title: req.body.title,
    AddressLine1: req.body.address,
    Town: req.body.town,
    StateOrProvince: req.body.state,
    Postcode: req.body.postal,
    Connection: Array,
    Location: {
      type: req.body.type,
      coordinates: JSON.parse(req.body.coordinates)
    }
  })
  res.json(myStation.id);
};

const station_delete_id = async (req, res) => {
  const myStation = await stationModel
      .findById(req.body.id).remove();
  res.json(myStation.id);
};

const station_update_put = async (req, res) => {
  const myStation = await stationModel.findByIdAndUpdate(req.body.id, req.body);
  res.json(myStation);
}

module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_get_within,
  station_delete_id,
  station_update_put
};
