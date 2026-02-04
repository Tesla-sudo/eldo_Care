const mongoose = require('mongoose');

const chvActivitySchema = new mongoose.Schema({
  chvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CHV' },
  triageCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'TriageCase' },
  activityType: { type: String, enum: ['triage', 'pwd_assist'] },
  verified: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CHVActivity', chvActivitySchema);
