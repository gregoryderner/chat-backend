const LoggingService = require('../services/LoggingService'); 
const ConsoleLogger = require('../services/ConsoleLogger'); 

const loggingService = new LoggingService(new ConsoleLogger());

function requestLogger(req, res, next) {
  loggingService.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = requestLogger;