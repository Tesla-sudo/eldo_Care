const ApiClient = require('../models/ApiClient');

module.exports = async function auth(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  const client = await ApiClient.findOne({
    apiKey,
    status: 'active'
  });

  if (!client) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  req.auth = {
    role: client.role,
    ownerRef: client.ownerRef
  };

  next();
};
