'use strict';
const connectionTypeModel = require('../models/connectionType');

const connectionType_list_get = async (req, res) => {
  try {
    console.log('Waiting for connectionTypes')
    const connectionTypes = await connectionTypeModel.find()
    res.json(connectionTypes);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const connectionType_get = async (req, res) => {
  try {
    console.log('Waiting for connectionType')
    const connectionType = await connectionTypeModel.findById(req.params.id);
    res.json(connectionType);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const connectionType_post = (req, res) => {
  res.send('With this endpoint you can add connectionTypes');
};

module.exports = {
  connectionType_list_get,
  connectionType_get,
  connectionType_post,
};
