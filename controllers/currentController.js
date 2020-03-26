'use strict';
const currentModel = require('../models/currentType');

const current_list_get = async (req, res) => {
  try {
    console.log('Waiting for currents')
    const currents = await currentModel.find()
    res.json(currents);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const current_get = async (req, res) => {
  try {
    console.log('Waiting for current')
    const current = await currentModel.findById(req.params.id);
    res.json(current);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const current_post = (req, res) => {
  res.send('With this endpoint you can add currents');
};

module.exports = {
  current_list_get,
  current_get,
  current_post,
};
