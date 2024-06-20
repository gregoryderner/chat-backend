class LoggingService {
  constructor(logger) {
    this.logger = logger;
  }

  info(message) {
    this.logger.info(`${message}`);
  }

  warn(message) {
    this.logger.warn(`${message}`);
  }

  error(message) {
    this.logger.error(`${message}`);
  }

  log(message) {
    this.logger.log(`${message}`);
  }
}

module.exports = LoggingService;