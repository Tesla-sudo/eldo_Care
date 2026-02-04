const Dispatch = require('../models/Dispatch');
const RevenueLedger = require('../models/RevenueLedger');

exports.dispatchAmbulance = async (triageCase) => {
  const dispatch = await Dispatch.create({
    triageCaseId: triageCase._id,
    partnerName: 'Local Ambulance Service',
    status: 'sent',
    fee: 1500
  });

  await RevenueLedger.create({
    source: 'dispatch_fee',
    referenceId: dispatch._id,
    amount: 1500,
    beneficiary: 'Ambulance Partner'
  });

  return dispatch;
};
