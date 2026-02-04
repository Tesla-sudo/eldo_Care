const twilio = require('twilio');

module.exports = function validateTwilio(req, res, next) {
  if (process.env.SKIP_TWILIO_VALIDATION === 'true') {
    return next();
  }

  const signature = req.headers['x-twilio-signature'];
  const url = process.env.PUBLIC_BASE_URL + req.originalUrl;

  const isValid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN,
    signature,
    url,
    req.body
  );

  if (!isValid) {
    return res.status(403).send('Invalid Twilio signature');
  }

  next();
};
