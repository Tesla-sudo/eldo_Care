const mongoose = require('mongoose');

const chvSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneHash: { type: String, required: true },

  county: String,
  affiliatedOrg: String, // e.g. MOH / AMPATH

  stats: {
    triagesCompleted: { type: Number, default: 0 },
    verifiedCases: { type: Number, default: 0 },
    escalationsTriggered: { type: Number, default: 0 }
  },

  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active'
  },

  createdAt: { type: Date, default: Date.now }
});

chvSchema.index({ phoneHash: 1 });

module.exports = mongoose.model('CHV', chvSchema);
