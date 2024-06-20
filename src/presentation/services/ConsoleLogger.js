const ILogger = require('./ILogger');

class ConsoleLogger extends ILogger {
  info(message) {
    console.log(`INFO: ${message}`);
  }

  warn(message) {
    console.warn(`WARN: ${message}`);
  }

  error(message) {
    console.error(`ERROR: ${message}`);
  }

  log(message) {
    console.log(`LOG: ${message}`);
  }
}

module.exports = ConsoleLogger;