const LoggingService = require('../services/LoggingService');
const ConsoleLogger = require('../services/ConsoleLogger');

function errorHandler(err, req, res, next) {
  const loggingService = new LoggingService(new ConsoleLogger());
  loggingService.error(`Error occurred in ${req.method} ${req.originalUrl}`);
  loggingService.error(`Error stack: ${err.stack}`);
  res.status(500).json({ error: err.message, details: err.stack });
}

module.exports = errorHandler;