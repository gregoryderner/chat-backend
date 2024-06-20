const request = require('supertest');
const express = require('express');
const { setupRoutes } = require('../src/presentation/routes');
const UserRepository = require('../src/infrastructure/database/UserRepository');

const app = express();
setupRoutes(app);

describe('Auth API', () => {
  beforeAll(async () => {
    // Clear the database before running tests
    const userRepository = new UserRepository();
    await userRepository.clear();
  });

  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
  });

  test('should login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
