const cron = require('node-cron');
const Food = require('../models/Food');

const expireFood = cron.schedule('* * * * *', async () => {
  try {
    const result = await Food.deleteMany({ expiryTime: { $lt: new Date() } });
    console.log(`Expired food removed: ${result.deletedCount}`);
  } catch (err) {
    console.error('Error removing expired food:', err);
  }
});

module.exports = expireFood;
