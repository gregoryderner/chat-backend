const jwt = require('jsonwebtoken');

class TokenService {
  constructor(secretKey = process.env.JWT_SECRET || 'your-secret-key') {
    this.secretKey = secretKey;
  }

  generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secretKey);
  }
}

module.exports = TokenService;
