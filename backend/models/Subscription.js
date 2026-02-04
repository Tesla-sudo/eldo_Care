const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  plan: { type: String, enum: ['basic', 'standard', 'enterprise'] },
  leadQuota: Number,
  active: Boolean,
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
