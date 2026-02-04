const express = require('express');
const twilio = require('twilio');
const CallSession = require('../models/CallSession');

const router = express.Router();
const VoiceResponse = twilio.twiml.VoiceResponse;

// =======================
// Outbound voice agent
// =======================
router.post('/outbound', async (req, res) => {
  const twiml = new VoiceResponse();
  const callSid = req.body.CallSid;

  const session = await CallSession.findOne({ callSid });

  twiml.say(
    { voice: 'Polly.Joanna' },
    'Hello. This is Eldo Care, your community health assistant.'
  );

  twiml.pause({ length: 1 });

  twiml.say(
    'This call was initiated from our platform to help answer your health questions.'
  );

  twiml.pause({ length: 1 });

  twiml.say(
    'Based on the information provided, our system can offer guidance and referral recommendations.'
  );

  twiml.say(
    'Please note, this does not replace a qualified medical professional.'
  );

  twiml.hangup();

  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;



// router.post('/incoming', validateTwilio, (req, res) => {
//   const twiml = new VoiceResponse();

//   twiml.say(
//     { voice: 'woman' },
//     'Welcome to Community Health Access. This service provides health guidance only and does not replace a medical professional.'
//   );

//   twiml.record({
//     action: `${BASE_URL}/voice/process-recording`,
//     transcribe: true,
//     transcribeCallback: `${BASE_URL}/voice/transcription`,
//     maxLength: 60,
//     finishOnKey: '#'
//   });

//   twiml.say('We did not receive any input. Goodbye.');
//   twiml.hangup();

//   res.type('text/xml');
//   res.send(twiml.toString());
// });

// =======================
// After recording
// =======================
router.post('/process-recording', validateTwilio, async (req, res) => {
  const twiml = new VoiceResponse();
  const callSid = req.body.CallSid;

  const session = await CallSession.findOne({ callSid });

  if (!session || !session.aiResponse) {
    twiml.say(
      'Your request is still being processed. Please try again shortly or visit a nearby health facility.'
    );
    twiml.hangup();
  } else {
    const { guidance, disclaimer } = session.aiResponse;
    twiml.say(`${guidance} ${disclaimer}`);
    twiml.hangup();
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// =======================
// Transcription callback
// =======================
router.post('/transcription', validateTwilio, async (req, res) => {
  const transcription = req.body.TranscriptionText;
  const callSid = req.body.CallSid;
  const rawPhone = req.body.From;

  if (!transcription) {
    return res.sendStatus(200);
  }

  // Hash phone number for privacy
  const phoneHash = crypto
    .createHash('sha256')
    .update(rawPhone)
    .digest('hex');

  const aiResponse = await getAIResponse(transcription);

  await CallSession.create({
    callSid,
    phoneHash,
    transcription,
    aiResponse
  });

  console.log('Call processed:', callSid);
  res.sendStatus(200);
});

module.exports = router;
