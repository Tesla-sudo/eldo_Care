const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(to, message) {
  if (!to) return;

  try {
    await client.messages.create({
      to,
      from: process.env.TWILIO_SMS_NUMBER,
      body: message
    });
  } catch (err) {
    console.error('SMS failed:', err.message);
  }
}

module.exports = { sendSMS };
