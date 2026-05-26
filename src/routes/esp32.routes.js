const express = require('express');
const { ingestEsp32RawData } = require('../controllers/esp32.controller');

const router = express.Router();

router.post('/raw', ingestEsp32RawData);

module.exports = router;
