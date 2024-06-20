const TokenService = require('../src/application/services/TokenService');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('TokenService', () => {
  let tokenService;
  const secretKey = 'test-secret-key';

  beforeEach(() => {
    tokenService = new TokenService(secretKey);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should generate a token', () => {
    const mockUser = { id: '1', username: 'testuser' };
    const mockToken = 'mock-token';

    jwt.sign.mockReturnValue(mockToken);

    const token = tokenService.generateToken(mockUser);

    expect(token).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser.id, username: mockUser.username },
      secretKey,
      { expiresIn: '1h' }
    );
  });

  test('should verify a token', () => {
    const mockToken = 'mock-token';
    const mockDecoded = { id: '1', username: 'testuser' };

    jwt.verify.mockReturnValue(mockDecoded);

    const decoded = tokenService.verifyToken(mockToken);

    expect(decoded).toBe(mockDecoded);
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, secretKey);
  });

  test('should throw an error for an invalid token', () => {
    const mockToken = 'invalid-token';

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => {
      tokenService.verifyToken(mockToken);
    }).toThrow('Invalid token');
  });
});
