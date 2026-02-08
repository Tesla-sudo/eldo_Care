// backend/models/Case.js (new model for CHV cases — add this file)
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  riskLevel: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  images: [String],
  status: { type: String, default: 'pending' },
  escalation: { type: Boolean, default: false },
  referral: String,
  location: { type: { lat: Number, lng: Number } },
  userId: mongoose.Schema.Types.ObjectId, // Reference to CHV user
  hospitalId: mongoose.Schema.Types.ObjectId, // If assigned
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', caseSchema);