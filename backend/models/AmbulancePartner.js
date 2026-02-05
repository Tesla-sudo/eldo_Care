const mongoose = require('mongoose');

const ambulancePartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },

  coverageCounties: [String],

  contact: {
    phone: String,
    email: String
  },

  pricing: {
    leadFee: { type: Number, default: 500 } // KES per dispatch
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },

  createdAt: { type: Date, default: Date.now }
});

ambulancePartnerSchema.index({ coverageCounties: 1 });

module.exports = mongoose.model('AmbulancePartner', ambulancePartnerSchema);
