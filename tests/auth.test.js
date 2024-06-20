const request = require('supertest');
const express = require('express');
const { setupRoutes } = require('../src/presentation/routes');
const UserRepository = require('../src/infrastructure/database/UserRepository');

const app = express();
setupRoutes(app);

describe('Auth API', () => {
  // Limpar o banco de dados antes de executar os testes
  beforeAll(async () => {
    const userRepository = new UserRepository();
    await userRepository.clear();
  });

  // Teste para registrar um novo usuário
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

  // Teste para fazer login com um usuário registrado
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
