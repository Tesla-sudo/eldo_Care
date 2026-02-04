const Hospital = require('../models/Hospital');
const Subscription = require('../models/Subscription');

exports.matchHospital = async (triageCase) => {
  const hospitals = await Hospital.find({ isActive: true });

  // TODO: replace with geo + capacity logic
  return hospitals[0];
};
