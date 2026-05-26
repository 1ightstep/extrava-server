const { MongoClient } = require('mongodb');
const { mongoUri } = require('../config/env');

let client;
let database;

async function connectMongo() {
  if (database) return database;

  client = new MongoClient(mongoUri);
  await client.connect();
  database = client.db();
  return database;
}

async function getDb() {
  return connectMongo();
}

async function closeMongo() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}

module.exports = {
  getDb,
  closeMongo,
};
