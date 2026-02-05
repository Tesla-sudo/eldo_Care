const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  county: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number
  },

  contact: {
    phone: String,
    email: String
  },

  subscription: {
    plan: {
      type: String,
      enum: ['basic', 'premium', 'enterprise'],
      default: 'basic'
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'expired'],
      default: 'active'
    },
    expiresAt: Date
  },

  capabilities: {
    emergency: Boolean,
    maternity: Boolean,
    surgery: Boolean
  },

  createdAt: { type: Date, default: Date.now }
});

hospitalSchema.index({ county: 1 });
hospitalSchema.index({ 'subscription.status': 1 });

module.exports = mongoose.model('Hospital', hospitalSchema);
