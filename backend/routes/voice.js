const express = require("express");
const twilio = require("twilio");
const crypto = require("crypto");
const CallSession = require("../models/CallSession");
const validateTwilio = require("../middleware/validateTwilio");

const router = express.Router();
const VoiceResponse = twilio.twiml.VoiceResponse;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * ============================
 * CALL ME — USER INITIATED
 * ============================
 */
router.post("/call-me", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber || !phoneNumber.startsWith("+")) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const call = await client.calls.create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: `${process.env.BASE_URL}/voice/outbound`,
      method: "POST"
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Twilio error:", err);
    res.status(500).json({ error: err.message, details: err });
  }
});


/**
 * ============================
 * OUTBOUND VOICE FLOW (Twilio)
 * ============================
 */
router.post("/outbound", async (req, res) => {
  const twiml = new VoiceResponse();
  const callSid = req.body.CallSid;

  twiml.say(
    { voice: "Polly.Joanna" },
    "Hello. This is Eldo Care, your community health assistant."
  );

  twiml.pause({ length: 1 });

  twiml.say(
    "This call was initiated to help answer your health questions."
  );

  twiml.pause({ length: 1 });

  twiml.say(
    "Please note, this does not replace a qualified medical professional."
  );

  twiml.hangup();

  res.type("text/xml");
  res.send(twiml.toString());
});

console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

module.exports = router;
