const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: String,
  services: [String],
  location: {
    lat: Number,
    lng: Number,
    county: String
  },
  isActive: Boolean
});

module.exports = mongoose.model('Hospital', hospitalSchema);
