const RevenueLedger = require('../models/RevenueLedger');

exports.logSubscriptionRevenue = async (hospitalId, amount) => {
  await RevenueLedger.create({
    source: 'hospital_subscription',
    referenceId: hospitalId,
    amount,
    beneficiary: 'Platform'
  });
};
