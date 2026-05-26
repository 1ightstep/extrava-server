const { getRedisClient } = require('../db/redis');
const { getDb } = require('../db/mongo');

async function queueForPython(rawPacket) {
  return rawPacket;
}

async function ingestRawData(payload, source = 'unknown') {
  const receivedAt = new Date();
  const rawPacket = {
    source,
    payload,
    receivedAt,
  };

  const redis = await getRedisClient();
  const redisStreamId = await redis.xAdd('esp32:raw', '*', {
    payload: JSON.stringify(payload),
    source,
    receivedAt: receivedAt.toISOString(),
  });

  const db = await getDb();
  const insertResult = await db.collection('esp32_raw_packets').insertOne({
    ...rawPacket,
    redisStreamId,
  });

  await queueForPython({
    ...rawPacket,
    _id: insertResult.insertedId,
    redisStreamId,
  });

  return {
    redisStreamId,
    mongoId: String(insertResult.insertedId),
  };
}

module.exports = {
  ingestRawData,
};
