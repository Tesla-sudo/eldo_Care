const mongoose = require('mongoose');

const apiClientSchema = new mongoose.Schema({
  name: String,

  role: {
    type: String,
    enum: ['admin', 'hospital', 'government', 'chv'],
    required: true
  },

  ownerRef: {
    type: mongoose.Schema.Types.ObjectId
  },

  apiKey: {
    type: String,
    required: true,
    unique: true
  },

  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active'
  },

  createdAt: { type: Date, default: Date.now }
});

apiClientSchema.index({ apiKey: 1 });

module.exports = mongoose.model('ApiClient', apiClientSchema);
