const express = require('express');
const twilio = require('twilio');
const CallSession = require('../models/CallSession');

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// =======================
// USER clicks "Call Me"
// =======================
router.post('/call-me', async (req, res) => {
  const { phoneNumber, intent } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'phoneNumber is required' });
  }

  try {
    const call = await client.calls.create({
      to: phoneNumber,
      from: process.env.TWILIO_CALLER_NUMBER,
      url: `${process.env.PUBLIC_BASE_URL}/voice/outbound`,
    });

    await CallSession.create({
      callSid: call.sid,
      intent
    });

    res.json({
      success: true,
      message: 'Call initiated',
      callSid: call.sid
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =======================
// Admin dashboard
// =======================
router.get('/cases', async (req, res) => {
  const cases = await CallSession.find().sort({ createdAt: -1 });
  res.json(cases);
});

module.exports = router;






// const express = require('express');
// const CallSession = require('../models/CallSession');
// const { getAIResponse } = require('../services/ai');

// const router = express.Router();

// // CHV / Admin text submission
// router.post('/submit-case', async (req, res) => {
//   const { symptoms, chvId } = req.body;

//   if (!symptoms) {
//     return res.status(400).json({ error: 'Symptoms are required' });
//   }

//   const aiResponse = await getAIResponse(symptoms);

//   const session = await CallSession.create({
//     callSid: `chv-${Date.now()}`,
//     transcription: symptoms,
//     aiResponse
//   });

//   res.json({ success: true, caseId: session._id, aiResponse });
// });

// // Admin dashboard
// router.get('/cases', async (req, res) => {
//   const cases = await CallSession.find()
//     .sort({ createdAt: -1 })
//     .select('-phoneHash');

//   res.json(cases);
// });

// module.exports = router;
