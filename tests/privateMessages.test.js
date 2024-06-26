const request = require('supertest');
const express = require('express');
const { setupRoutes } = require('../src/presentation/routes');
const UserRepository = require('../src/infrastructure/database/UserRepository');
const AuthService = require('../src/application/services/AuthService');
const jwt = require('jsonwebtoken');

const app = express();
setupRoutes(app);

describe('Private Messages API', () => {
  let authService;
  let userRepository;
  let token;
  let userId;

  // Configuração inicial antes de todos os testes
  beforeAll(async () => {
    userRepository = new UserRepository();
    await userRepository.clear();
    authService = new AuthService();
    const user = await authService.register('testuser', 'password123');
    userId = user.id;
    const loginResponse = await authService.login('testuser', 'password123');
    token = loginResponse.token;
  });

  // Teste para recuperar mensagens privadas para um usuário autenticado
  test('should retrieve private messages for authenticated user', async () => {
    const response = await request(app)
      .get('/api/messages/private')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Teste para garantir que um usuário não autenticado não pode recuperar mensagens privadas
  test('should not retrieve private messages for unauthenticated user', async () => {
    const response = await request(app)
      .get('/api/messages/private');

    expect(response.status).toBe(403);
  });
});
