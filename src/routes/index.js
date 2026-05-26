const express = require('express');
const healthRoutes = require('./health.routes');
const esp32Routes = require('./esp32.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/esp32', esp32Routes);
router.use('/users', userRoutes);

module.exports = router;
