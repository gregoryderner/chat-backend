const LoggingService = require('../src/presentation/services/LoggingService');

describe('LoggingService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should log info messages', () => {
    LoggingService.info('This is an info message');
    expect(console.log).toHaveBeenCalledWith('INFO: This is an info message');
  });

  test('should log warning messages', () => {
    LoggingService.warn('This is a warning message');
    expect(console.warn).toHaveBeenCalledWith('WARN: This is a warning message');
  });

  test('should log error messages', () => {
    LoggingService.error('This is an error message');
    expect(console.error).toHaveBeenCalledWith('ERROR: This is an error message');
  });
});
