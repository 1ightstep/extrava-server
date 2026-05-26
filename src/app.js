const express = require('express');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error-handler');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
