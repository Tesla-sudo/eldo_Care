// middleware/validateTwilio.js
const twilio = require('twilio');

module.exports = function validateTwilio(req, res, next) {
  const signature = req.headers['x-twilio-signature'];
  const url = process.env.BASE_URL + req.originalUrl; // <-- change here

  const isValid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN,
    signature,
    url,
    req.body
  );

  if (!isValid) {
    console.error('Twilio signature validation failed');
    return res.status(403).send('Invalid Twilio signature');
  }

  next();
};
