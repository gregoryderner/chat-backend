const request = require('supertest');
const express = require('express');
const errorHandler = require('../src/presentation/middlewares/errorHandler');
const LoggingService = require('../src/presentation/services/LoggingService');

describe('Error Handler Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    jest.spyOn(LoggingService, 'error').mockImplementation(() => {});
    app.get('/error', (req, res) => {
      throw new Error('Test error');
    });
    app.use(errorHandler);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should log error and return 500 status', async () => {
    const response = await request(app).get('/error');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Test error');
    expect(LoggingService.error).toHaveBeenCalled();
  });
});
