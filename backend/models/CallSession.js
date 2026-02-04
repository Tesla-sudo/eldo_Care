const mongoose = require('mongoose');

const callSessionSchema = new mongoose.Schema({
  callSid: { type: String, required: true },
  intent: String,
  phoneHash: String,
  aiResponse: Object,
  createdAt: { type: Date, default: Date.now }
});

callSessionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('CallSession', callSessionSchema);
