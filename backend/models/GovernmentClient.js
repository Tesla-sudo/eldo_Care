const mongoose = require('mongoose');

const governmentClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['government', 'ngo'],
    required: true
  },

  region: String, // e.g. Uasin Gishu
  contact: {
    email: String,
    phone: String
  },

  accessLevel: {
    type: String,
    enum: ['county', 'national', 'program'],
    default: 'county'
  },

  subscription: {
    status: {
      type: String,
      enum: ['active', 'expired'],
      default: 'active'
    },
    expiresAt: Date
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GovernmentClient', governmentClientSchema);
