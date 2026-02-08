// backend/routes/api.js (updated for dynamic DB queries)
const express = require('express');
const router = express.Router();
const CallSession = require('../models/CallSession'); // Assuming this model exists for call cases
const Case = require('../models/Case'); // Assuming a Case model for CHV submissions (see below)

// =======================
// Admin Insights
// =======================
router.get('/insights/overview', async (req, res) => {
  try {
    const totalCalls = await CallSession.countDocuments();
    const activeCases = await Case.countDocuments({ status: 'pending' });
    const resolvedCases = await Case.countDocuments({ status: { $in: ['verified', 'resolved'] } });

    res.json([
      { _id: "Total Calls", total: totalCalls },
      { _id: "Active Cases", total: activeCases },
      { _id: "Resolved Cases", total: resolvedCases }
    ]);
  } catch (err) {
    console.error('Overview error:', err);
    res.status(500).json({ error: 'Failed to load overview' });
  }
});

// =======================
// NGO / Admin Insights
// =======================
router.get('/insights/hospital/leads', async (req, res) => {
  // Example: Aggregate leads by hospital (adjust based on your DB schema)
  const leads = await Case.aggregate([
    { $group: { _id: '$hospitalId', leads: { $sum: 1 } } },
    { $lookup: { from: 'hospitals', localField: '_id', foreignField: '_id', as: 'hospital' } },
    { $unwind: '$hospital' },
    { $project: { id: '$_id', name: '$hospital.name', leads: 1 } }
  ]);

  res.json(leads);
});
// In api.js
router.get('/billing/summary', async (req, res) => {
  // Example placeholder - replace with real logic
  res.json({
    totalRevenue: 5000,
    pendingPayments: 1200,
    paidEvents: 9
  });
});

router.get('/insights/summary', async (req, res) => {
  try {
    const totalCalls = await CallSession.countDocuments();
    const highRiskCases = await Case.countDocuments({ riskLevel: { $in: ['high', 'critical'] } });
    const escalations = await Case.countDocuments({ escalation: true });
    const revenueEvents = await CallSession.countDocuments({ paymentStatus: 'paid' }); // Adjust if billing model exists

    res.json({
      totalCalls,
      highRiskCases,
      escalations,
      revenueEvents
    });
  } catch (err) {
    console.error('Summary error:', err);
    res.status(500).json({ error: 'Failed to load summary' });
  }
});

router.get('/insights/heatmap', async (req, res) => {
  // Example: Get geo points from cases (assume lat/lng in model)
  const points = await Case.find({ location: { $exists: true } }).select('location riskLevel');

  res.json({ points });
});

// =======================
// CHV Routes (uncommented and updated to save to DB)
// =======================
router.post('/chv/cases', async (req, res) => {
  const { description, riskLevel, images } = req.body; // Assuming body parser handles

  try {
    const newCase = new Case({
      description,
      riskLevel,
      images: images || [], // From multer if files
      status: 'pending',
      createdAt: new Date()
    });
    await newCase.save();
    res.json({ success: true, message: 'Case submitted', case: newCase });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit case' });
  }
});

router.get('/chv/cases/me', async (req, res) => {
  // Assume auth middleware for "me" — filter by userId
  const cases = await Case.find({ userId: req.user?.id }).sort({ createdAt: -1 }); // Adjust for auth
  res.json(cases);
});

router.get('/chv/verification', async (req, res) => {
  // Example verification logic
  res.json({ verified: true });
});

router.get('/chv/activity', async (req, res) => {
  // Example activity log
  res.json({ activity: [] });
});

module.exports = router;