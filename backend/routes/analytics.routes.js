const express = require('express');
const { getOverview } = require('../services/analytics.service');

const router = express.Router();

router.get('/overview', async (req, res) => {
  const data = await getOverview(req.query.county);
  res.json(data);
});

module.exports = router;
