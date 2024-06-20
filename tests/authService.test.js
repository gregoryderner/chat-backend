const AuthService = require('../src/application/services/AuthService');
const UserService = require('../src/application/services/UserService');
const TokenService = require('../src/application/services/TokenService');
const bcrypt = require('bcrypt');

jest.mock('../src/application/services/UserService');
jest.mock('../src/application/services/TokenService');
jest.mock('bcrypt');

describe('AuthService', () => {
  let authService;
  let userService;
  let tokenService;

  beforeEach(() => {
    userService = new UserService();
    tokenService = new TokenService();
    authService = new AuthService(userService, tokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should register a new user with hashed password', async () => {
    const mockUser = { id: '1', username: 'testuser', password: 'hashedpassword', publicKey: 'publicKey123' };
    bcrypt.hash.mockResolvedValue('hashedpassword');
    userService.registerUser.mockResolvedValue(mockUser);

    const user = await authService.register('testuser', 'password123', 'publicKey123');

    expect(user).toEqual(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(userService.registerUser).toHaveBeenCalledWith('testuser', 'hashedpassword', 'publicKey123');
  });

  test('should login a user and return a token', async () => {
    const mockUser = { id: '1', username: 'testuser', password: 'hashedpassword' };
    const mockToken = 'mock-token';
    userService.findUserByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    tokenService.generateToken.mockReturnValue(mockToken);

    const result = await authService.login('testuser', 'password123');

    expect(result).toEqual({ user: mockUser, token: mockToken });
    expect(userService.findUserByUsername).toHaveBeenCalledWith('testuser');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
    expect(tokenService.generateToken).toHaveBeenCalledWith(mockUser);
  });

  test('should throw an error if user is not found during login', async () => {
    userService.findUserByUsername.mockResolvedValue(null);

    await expect(authService.login('testuser', 'password123')).rejects.toThrow('User not found');
  });

  test('should throw an error if password is invalid during login', async () => {
    const mockUser = { id: '1', username: 'testuser', password: 'hashedpassword' };
    userService.findUserByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.login('testuser', 'password123')).rejects.toThrow('Invalid password');
  });

  test('should store public key for a user', async () => {
    userService.storeUserPublicKey.mockResolvedValue();

    await authService.storePublicKey('1', 'publicKey123');

    expect(userService.storeUserPublicKey).toHaveBeenCalledWith('1', 'publicKey123');
  });

  test('should get public key for a user', async () => {
    const mockPublicKey = 'publicKey123';
    userService.getUserPublicKey.mockResolvedValue(mockPublicKey);

    const publicKey = await authService.getPublicKey('1');

    expect(publicKey).toBe(mockPublicKey);
    expect(userService.getUserPublicKey).toHaveBeenCalledWith('1');
  });
});
