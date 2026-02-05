const express = require('express');
const CallSession = require('../models/CallSession');

const router = express.Router();

// =======================
// Admin Insights
// =======================
router.get('/insights/overview', async (req, res) => {
  // Example mock data
  res.json({
    totalCalls: 25,
    activeCases: 10,
    resolvedCases: 5
  });
});

router.get('/insights/hospital/leads', async (req, res) => {
  // Example mock data
  res.json([
    { id: 1, name: 'Hospital A', leads: 5 },
    { id: 2, name: 'Hospital B', leads: 8 }
  ]);
});

router.get('/insights/summary', async (req, res) => {
  res.json({ summary: 'NGO summary data' });
});

router.get('/insights/heatmap', async (req, res) => {
  res.json({ heatmap: [] });
});

// =======================
// CHV Routes
// =======================
router.post('/chv/cases', async (req, res) => {
  const { name, description } = req.body;
  // Save case to DB
  res.json({ success: true, message: 'Case submitted' });
});

router.get('/chv/cases/me', async (req, res) => {
  res.json([{ id: 1, name: 'Case 1' }, { id: 2, name: 'Case 2' }]);
});

router.get('/chv/verification', async (req, res) => {
  res.json({ verified: true });
});

// =======================
// CHV Activity
// =======================
router.get('/chv/activity', async (req, res) => {
  res.json({ activity: [] });
});
// Billing summary route
router.get('/billing/summary', async (req, res) => {
  // Replace with real data from DB
  res.json({ totalRevenue: 12000, pendingPayments: 3000 });
});


module.exports = router;







// const express = require('express');
// const twilio = require('twilio');
// const CallSession = require('../models/CallSession');

// const router = express.Router();

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // =======================
// // USER clicks "Call Me"
// // =======================
// router.post('/call-me', async (req, res) => {
//   const { phoneNumber, intent } = req.body;

//   if (!phoneNumber) {
//     return res.status(400).json({ error: 'phoneNumber is required' });
//   }

//   try {
//     const call = await client.calls.create({
//       to: phoneNumber,
//       from: process.env.TWILIO_CALLER_NUMBER,
//       url: `${process.env.PUBLIC_BASE_URL}/voice/outbound`,
//     });

//     await CallSession.create({
//       callSid: call.sid,
//       intent
//     });

//     res.json({
//       success: true,
//       message: 'Call initiated',
//       callSid: call.sid
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // =======================
// // Admin dashboard
// // =======================
// router.get('/cases', async (req, res) => {
//   const cases = await CallSession.find().sort({ createdAt: -1 });
//   res.json(cases);
// });

// module.exports = router;






// // const express = require('express');
// // const CallSession = require('../models/CallSession');
// // const { getAIResponse } = require('../services/ai');

// // const router = express.Router();

// // // CHV / Admin text submission
// // router.post('/submit-case', async (req, res) => {
// //   const { symptoms, chvId } = req.body;

// //   if (!symptoms) {
// //     return res.status(400).json({ error: 'Symptoms are required' });
// //   }

// //   const aiResponse = await getAIResponse(symptoms);

// //   const session = await CallSession.create({
// //     callSid: `chv-${Date.now()}`,
// //     transcription: symptoms,
// //     aiResponse
// //   });

// //   res.json({ success: true, caseId: session._id, aiResponse });
// // });

// // // Admin dashboard
// // router.get('/cases', async (req, res) => {
// //   const cases = await CallSession.find()
// //     .sort({ createdAt: -1 })
// //     .select('-phoneHash');

// //   res.json(cases);
// // });

// // module.exports = router;
