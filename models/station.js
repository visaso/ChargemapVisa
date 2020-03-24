// https://docs.mongodb.com/manual/core/2dsphere/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Connections: Array, // TODO: add relation to Connections: https://mongoosejs.com/docs/populate.html
  Title: String,
  AddressLine1: String,
  Town: String,
  StateOrProvince: String,
  Postcode: String,
  Location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number], // longitude first
      required: true,
    },
  },
});

module.exports = mongoose.model('Station', stationSchema);
