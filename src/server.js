const app = require('./app');
const { port } = require('./config/env');
const { closeMongo } = require('./db/mongo');
const { closeRedis } = require('./db/redis');

const server = app.listen(port, () => {
  console.log(`extrava-server listening on port ${port}`);
});

async function shutdown() {
  server.close(async () => {
    await closeRedis();
    await closeMongo();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
