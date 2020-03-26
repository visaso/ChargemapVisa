'use strict';
const connectionModel = require('../models/connection');

const connection_list_get = async (req, res) => {
  try {
    console.log('Waiting for connections')
    const connections = await connectionModel.find().populate('ConnectionTypeID').populate('LevelID').populate('CurrentTypeID');
    res.json(connections);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const connection_get = async (req, res) => {
  try {
    console.log('Waiting for connection')
    const connection = await connectionModel.findById(req.params.id).populate('ConnectionTypeID').populate('LevelID').populate('CurrentTypeID');
    res.json(connection);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const connection_post = (req, res) => {
  res.send('With this endpoint you can add connections');
};

module.exports = {
  connection_list_get,
  connection_get,
  connection_post,
};
