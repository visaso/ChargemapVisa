'use strict';
const levelModel = require('../models/level');

const level_list_get = async (req, res) => {
  try {
    console.log('Waiting for levels')
    const levels = await levelModel.find()
    res.json(levels);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const level_get = async (req, res) => {
  try {
    console.log('Waiting for level')
    const level = await levelModel.findById(req.params.id);
    res.json(level);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({message: e.message});
  }
};

const level_post = (req, res) => {
  res.send('With this endpoint you can add levels');
};

module.exports = {
  level_list_get,
  level_get,
  level_post,
};
