const TriageCase = require('../models/TriageCase');

exports.getOverview = async (county) => {
  return TriageCase.aggregate([
    { $match: { 'location.county': county } },
    { $group: { _id: '$riskLevel', count: { $sum: 1 } } }
  ]);
};
