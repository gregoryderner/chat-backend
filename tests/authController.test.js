const request = require('supertest');
const express = require('express');
const AuthController = require('../src/presentation/controllers/AuthController');
const AuthService = require('../src/application/services/AuthService');
const UserService = require('../src/application/services/UserService');
const TokenService = require('../src/application/services/TokenService');
const UserRepository = require('../src/infrastructure/database/UserRepository');

jest.mock('../src/application/services/AuthService');
jest.mock('../src/application/services/UserService');
jest.mock('../src/application/services/TokenService');
jest.mock('../src/infrastructure/database/UserRepository');

const app = express();
app.use(express.json());
app.post('/register', AuthController.register);
app.post('/login', AuthController.login);
app.post('/storePublicKey', AuthController.storePublicKey);
app.get('/publicKey/:userId', AuthController.getPublicKey);

describe('AuthController', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService(new UserService(new UserRepository()), new TokenService());
    jest.clearAllMocks();
  });

  test('should register a new user', async () => {
    const mockUser = { id: '1', username: 'testuser', password: 'hashedpassword', publicKey: 'publicKey123' };
    authService.register.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'password123', publicKey: 'publicKey123' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(authService.register).toHaveBeenCalledWith('testuser', 'password123', 'publicKey123');
  });

  test('should login a user', async () => {
    const mockResponse = { user: { id: '1', username: 'testuser' }, token: 'token123' };
    authService.login.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
    expect(authService.login).toHaveBeenCalledWith('testuser', 'password123');
  });

  test('should store public key', async () => {
    authService.storePublicKey.mockResolvedValue();

    const response = await request(app)
      .post('/storePublicKey')
      .send({ userId: '1', publicKey: 'publicKey123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Public key stored successfully' });
    expect(authService.storePublicKey).toHaveBeenCalledWith('1', 'publicKey123');
  });

  test('should get public key by userId', async () => {
    const mockPublicKey = 'publicKey123';
    authService.getPublicKey.mockResolvedValue(mockPublicKey);

    const response = await request(app)
      .get('/publicKey/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ publicKey: mockPublicKey });
    expect(authService.getPublicKey).toHaveBeenCalledWith('1');
  });
});
