module.exports.emitEvent = async function (type, payload) {
  console.log('[BILLING EVENT]', type, payload);

  // Later:
  // - Persist to BillingEvent collection
  // - Trigger invoice generation
  // - Notify partners
};
