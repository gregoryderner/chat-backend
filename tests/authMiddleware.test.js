const express = require('express');
const request = require('supertest');
const authMiddleware = require('../src/presentation/middlewares/authMiddleware');
const AuthMiddlewareService = require('../src/application/services/AuthMiddlewareService');

jest.mock('../src/application/services/AuthMiddlewareService');

describe('Auth Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get('/protected', authMiddleware, (req, res) => {
      res.status(200).json({ userId: req.userId });
    });
  });

  test('should return 403 if no token is provided', async () => {
    const response = await request(app).get('/protected');
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'No token provided');
  });

  test('should return 500 if token verification fails', async () => {
    AuthMiddlewareService.prototype.verifyToken.mockImplementation(() => {
      throw new Error('Failed to authenticate token');
    });
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'invalid-token');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Failed to authenticate token');
  });

  test('should call next if token is valid', async () => {
    AuthMiddlewareService.prototype.verifyToken.mockImplementation(() => {
      return { id: '123' };
    });
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'valid-token');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', '123');
  });
});
