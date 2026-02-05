const mongoose = require('mongoose');

const billingEventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'LeadGenerated',
      'EscalationTriggered',
      'VerifiedCHVAction'
    ],
    required: true
  },

  source: {
    type: String,
    enum: ['AI', 'CHV', 'SYSTEM'],
    default: 'SYSTEM'
  },

  callSid: { type: String },

  actors: {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    ambulancePartnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'AmbulancePartner' },
    chvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CHV' },
    governmentClientId: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentClient' }
  },

  metadata: {
    county: String,
    riskLevel: String,
    notes: String
  },

  billable: {
    type: Boolean,
    default: false
  },

  unitPrice: {
    type: Number,
    default: 0 // KES
  },

  createdAt: { type: Date, default: Date.now }
});

billingEventSchema.index({ type: 1, createdAt: -1 });
billingEventSchema.index({ 'actors.hospitalId': 1 });
billingEventSchema.index({ 'actors.chvId': 1 });

module.exports = mongoose.model('BillingEvent', billingEventSchema);
