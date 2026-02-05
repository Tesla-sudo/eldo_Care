const express = require("express");
const router = express.Router();

router.get("/summary", async (req, res) => {
  res.json({
    totalRevenue: 0,
    hospitalSubscriptions: 0,
    ambulanceLeads: 0,
    chvPayouts: 0
  });
});

module.exports = router;
