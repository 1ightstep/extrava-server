const test = require('node:test');
const assert = require('node:assert/strict');

const app = require('../src/app');

let server;
let baseUrl;

test.before(() => {
  server = app.listen(0);
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(() => {
  server.close();
});

test('GET /api/health returns ok status', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);

  const body = await response.json();
  assert.equal(body.status, 'ok');
  assert.equal(body.service, 'extrava-server');
});

test('GET /api/users/:userId returns placeholder user payload', async () => {
  const response = await fetch(`${baseUrl}/api/users/user-123`);
  assert.equal(response.status, 200);

  const body = await response.json();
  assert.equal(body.id, 'user-123');
});

test('POST /api/esp32/raw rejects empty body', async () => {
  const response = await fetch(`${baseUrl}/api/esp32/raw`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 400);

  const body = await response.json();
  assert.equal(body.message, 'Request body is required');
});
