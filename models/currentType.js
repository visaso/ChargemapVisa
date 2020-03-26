// https://docs.mongodb.com/manual/core/2dsphere/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const currentTypeSchema = new Schema({
  Description: String,
  Title: String
});

module.exports = mongoose.model('CurrentType', currentTypeSchema);