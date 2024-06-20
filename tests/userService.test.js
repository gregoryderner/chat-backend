const UserService = require('../src/application/services/UserService');
const UserRepository = require('../src/infrastructure/database/UserRepository');
const User = require('../src/domain/entities/User');

jest.mock('../src/infrastructure/database/UserRepository');

describe('UserService', () => {
  let userService;
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should register a new user', async () => {
    const mockUser = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    userRepository.save.mockResolvedValue(mockUser);

    const user = await userService.registerUser('testuser', 'password123', 'publicKey123');

    expect(user).toEqual(mockUser);
    expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      username: 'testuser',
      password: 'password123',
      publicKey: 'publicKey123'
    }));
  });

  test('should find a user by username', async () => {
    const mockUser = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    userRepository.findByUsername.mockResolvedValue(mockUser);

    const user = await userService.findUserByUsername('testuser');

    expect(user).toEqual(mockUser);
    expect(userRepository.findByUsername).toHaveBeenCalledWith('testuser');
  });

  test('should find a user by id', async () => {
    const mockUser = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    userRepository.findById.mockResolvedValue(mockUser);

    const user = await userService.findUserById('1');

    expect(user).toEqual(mockUser);
    expect(userRepository.findById).toHaveBeenCalledWith('1');
  });

  test('should store public key for a user', async () => {
    userRepository.storePublicKey.mockResolvedValue();

    await userService.storeUserPublicKey('1', 'publicKey123');

    expect(userRepository.storePublicKey).toHaveBeenCalledWith('1', 'publicKey123');
  });

  test('should get public key for a user', async () => {
    const mockPublicKey = 'publicKey123';
    userRepository.getPublicKey.mockResolvedValue(mockPublicKey);

    const publicKey = await userService.getUserPublicKey('1');

    expec
