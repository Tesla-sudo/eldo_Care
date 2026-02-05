const BillingEvent = require('../models/BillingEvent');

async function emitEvent({ type, source, callSid, actors, metadata, billable, unitPrice }) {
  try {
    await BillingEvent.create({
      type,
      source,
      callSid,
      actors,
      metadata,
      billable,
      unitPrice
    });

    console.log(`[EVENT] ${type} recorded`);
  } catch (err) {
    console.error('[EVENT ERROR]', err.message);
  }
}

module.exports = { emitEvent };
