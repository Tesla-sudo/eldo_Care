const mongoose = require('mongoose');

const triageCaseSchema = new mongoose.Schema({
  source: { type: String, enum: ['voice', 'chv', 'web'], required: true },
  symptoms: String,
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  location: {
    lat: Number,
    lng: Number,
    county: String,
    subCounty: String
  },
  matchedHospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  status: {
    type: String,
    enum: ['open', 'matched', 'dispatched', 'closed'],
    default: 'open'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TriageCase', triageCaseSchema);
