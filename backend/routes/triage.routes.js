const express = require('express');
const { createTriage } = require('../services/triage.service');
const { matchHospital } = require('../services/matching.service');

const router = express.Router();

router.post('/', async (req, res) => {
  const triage = await createTriage(req.body);
  const hospital = await matchHospital(triage);

  triage.matchedHospital = hospital._id;
  triage.status = 'matched';
  await triage.save();

  res.json(triage);
});

module.exports = router;
