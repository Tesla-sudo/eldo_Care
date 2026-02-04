const express = require('express');
const { dispatchAmbulance } = require('../services/dispatch.service');
const TriageCase = require('../models/TriageCase');

const router = express.Router();

router.post('/:id', async (req, res) => {
  const triage = await TriageCase.findById(req.params.id);
  const dispatch = await dispatchAmbulance(triage);

  triage.status = 'dispatched';
  await triage.save();

  res.json(dispatch);
});

module.exports = router;
