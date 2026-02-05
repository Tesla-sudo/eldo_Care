const Hospital = require('../models/Hospital');

module.exports.findEligibleHospitals = async function (county) {
  return Hospital.find({
    county,
    'subscription.status': 'active'
  });
};
