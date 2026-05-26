const { createClient } = require('redis');
const { redisUrl } = require('../config/env');

let client;

async function getRedisClient() {
  if (!client) {
    client = createClient({ url: redisUrl });
    client.on('error', (error) => {
      console.error('Redis error:', error.message);
    });
  }

  if (!client.isOpen) {
    await client.connect();
  }

  return client;
}

async function closeRedis() {
  if (client && client.isOpen) {
    await client.quit();
  }
}

module.exports = {
  getRedisClient,
  closeRedis,
};
