const express = require('express');
const BillingEvent = require('../models/BillingEvent');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

/**
 * Admin & Govt overview
 */
router.get(
  '/overview',
  auth,
  requireRole(['admin', 'government']),
  async (req, res) => {
    const data = await BillingEvent.aggregate([
      {
        $group: {
          _id: '$type',
          total: { $sum: 1 },
          revenue: { $sum: '$unitPrice' }
        }
      }
    ]);

    res.json(data);
  }
);

/**
 * Hospital leads
 */
router.get(
  '/hospital/leads',
  auth,
  requireRole(['hospital']),
  async (req, res) => {
    const leads = await BillingEvent.find({
      type: 'LeadGenerated',
      'actors.hospitalId': req.auth.ownerRef
    }).sort({ createdAt: -1 });

    res.json(leads);
  }
);

/**
 * CHV performance
 */
router.get(
  '/chv/performance',
  auth,
  requireRole(['chv', 'government']),
  async (req, res) => {
    const events = await BillingEvent.find({
      type: 'VerifiedCHVAction',
      'actors.chvId': req.auth.ownerRef
    });

    res.json({
      verifiedActions: events.length
    });
  }
);

module.exports = router;
