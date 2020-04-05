// https://docs.mongodb.com/manual/core/2dsphere/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Title: String,
  AddressLine1: String,
  Town: String,
  StateOrProvince: String,
  Postcode: String,
  Connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}],
  Location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  }
});

module.exports = mongoose.model('Station', stationSchema);

// Connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}],