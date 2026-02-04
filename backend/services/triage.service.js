const TriageCase = require('../models/TriageCase');

exports.createTriage = async (data) => {
  return TriageCase.create(data);
};
