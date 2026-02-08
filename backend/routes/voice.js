// backend/routes/voice.js
const express = require("express");
const twilio = require("twilio");
const CallSession = require("../models/CallSession");
const { getAIResponse } = require("../services/ai");

const router = express.Router();
const VoiceResponse = twilio.twiml.VoiceResponse;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Trigger outbound call
 */
router.post("/call-me", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber || !phoneNumber.startsWith("+")) {
      return res.status(400).json({ error: "Invalid phone number format (use E.164, e.g., +254...)" });
    }

    console.log("=== Initiating outbound call to:", phoneNumber);

    // Log BASE_URL for debugging
    console.log("Using BASE_URL:", process.env.BASE_URL);

    const call = await client.calls.create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: `${process.env.BASE_URL}/voice/outbound-triage`,
      method: "POST",
      statusCallback: `${process.env.BASE_URL}/voice/call-status`,
      statusCallbackMethod: "POST"
    });

    console.log("=== Call successfully created:", call.sid);

    res.json({ success: true, callSid: call.sid });
  } catch (err) {
    console.error("=== Twilio Call Creation Failed:", err.message);
    res.status(500).json({ error: "Twilio failed to place call", details: err.message });
  }
});

/**
 * Step 1: Greeting & Recording (when user answers)
 */
router.post("/outbound-triage", (req, res) => {
  console.log("!!! TWILIO REACHED /outbound-triage !!! CallSid:", req.body.CallSid || "unknown");
  console.log("Request IP:", req.ip);
  console.log("Full request body:", JSON.stringify(req.body, null, 2));

  const twiml = new VoiceResponse();
  
  const sayOptions = { voice: "Polly.Joanna", language: "en-US" };

  twiml.say(sayOptions, "Hello. This is Eldo Care. This is a community guidance service.");
  twiml.pause({ length: 1 });
  twiml.say(sayOptions, "Please describe your symptoms clearly after the beep. Press hash when finished.");

  twiml.record({
    action: `${process.env.BASE_URL}/voice/process-outbound-recording`,
    transcribe: true,
    transcribeCallback: `${process.env.BASE_URL}/voice/outbound-transcription`,
    maxLength: 30,
    finishOnKey: "#",
    playBeep: true
  });

  console.log("Sending initial TwiML response (welcome + record)");

  res.type("text/xml");
  res.send(twiml.toString());
});

/**
 * Step 2: Background Transcription & AI Processing
 */
router.post("/outbound-transcription", async (req, res) => {
  console.log("!!! TRANSCRIPTION CALLBACK RECEIVED !!! CallSid:", req.body.CallSid);
  console.log("Full transcription payload:", JSON.stringify(req.body, null, 2));

  const transcription = req.body.TranscriptionText?.trim();
  const callSid = req.body.CallSid;

  if (!transcription) {
    console.warn("No transcription text received");
    return res.sendStatus(200);
  }

  console.log("Transcription text:", transcription);

  let aiResponse;
  try {
    console.log("[AI] Starting Gemini triage...");
    aiResponse = await getAIResponse(transcription);
    console.log("[AI] Gemini success:", JSON.stringify(aiResponse, null, 2));
  } catch (err) {
    console.error("[AI] Gemini failed:", err.message || err);
    aiResponse = {
      risk_level: "medium",
      explanation: "Processing issue",
      guidance: "Rest and monitor symptoms.",
      escalation: true,
      referral: "Nearest health facility",
      disclaimer: "Guidance only - see a health worker."
    };
  }

  try {
    await CallSession.findOneAndUpdate(
      { callSid },
      { 
        callSid,
        phoneNumber: req.body.To,
        transcription,
        aiResponse,
        direction: "outbound",
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );
    console.log("[DB] Triage saved successfully for CallSid:", callSid);
  } catch (dbErr) {
    console.error("[DB] Save failed:", dbErr.message);
  }

  res.sendStatus(200);
});

/**
 * Step 3: Speaking the AI Result
 */
router.post("/process-outbound-recording", async (req, res) => {
  const twiml = new VoiceResponse();
  const callSid = req.body.CallSid;

  console.log("!!! PROCESS RECORDING CALLED !!! CallSid:", callSid);
  console.log("Full process payload:", JSON.stringify(req.body, null, 2));

  let session = null;
  let attempts = 0;
  const maxAttempts = 12; // wait up to ~12 seconds

  while (attempts < maxAttempts) {
    session = await CallSession.findOne({ callSid }).lean();
    if (session && session.aiResponse) {
      console.log("[PROCESS] Found AI response after", attempts, "seconds");
      break;
    }
    console.log(`[PROCESS] Attempt ${attempts + 1}/${maxAttempts}: No AI response yet`);
    await new Promise(r => setTimeout(r, 1000));
    attempts++;
  }

  if (session?.aiResponse) {
    const { risk_level, guidance, referral } = session.aiResponse;
    twiml.say({ voice: "Polly.Joanna" }, `Your risk level is ${risk_level}.`);
    twiml.say({ voice: "Polly.Joanna" }, `${guidance} We recommend visiting ${referral}.`);
    console.log("[PROCESS] Speaking real triage response");
  } else {
    console.log("[PROCESS] No AI response after wait - speaking fallback");
    twiml.say({ voice: "Polly.Joanna" }, "We are still analyzing your symptoms. Please follow standard first aid and monitor your health.");
  }

  twiml.say({ voice: "Polly.Joanna" }, "Thank you for using Eldo Care. Goodbye.");
  twiml.hangup();

  console.log("[PROCESS] Sending final TwiML");

  res.type("text/xml");
  res.send(twiml.toString());
});

/**
 * Call status updates (for debugging)
 */
router.post("/call-status", (req, res) => {
  console.log("[CALL STATUS UPDATE]", req.body.CallSid, "→", req.body.CallStatus);
  res.sendStatus(200);
});

module.exports = router;