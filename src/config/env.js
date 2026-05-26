const dotenv = require('dotenv');

dotenv.config({ quiet: true });

module.exports = {
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/extrava',
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
};
