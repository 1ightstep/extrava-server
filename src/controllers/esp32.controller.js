const { ingestRawData } = require('../services/esp32.service');

async function ingestEsp32RawData(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Request body is required',
      });
    }

    const source = req.get('x-data-source') || 'esp32';
    const result = await ingestRawData(req.body, source);

    return res.status(202).json({
      message: 'Raw data accepted',
      ...result,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  ingestEsp32RawData,
};
