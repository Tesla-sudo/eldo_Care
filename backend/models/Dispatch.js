const mongoose = require('mongoose');

const dispatchSchema = new mongoose.Schema({
  triageCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'TriageCase' },
  partnerName: String,
  status: { type: String, enum: ['sent', 'accepted', 'completed'] },
  fee: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dispatch', dispatchSchema);
