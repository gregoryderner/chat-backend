const TokenService = require('./TokenService');

class AuthMiddlewareService {
  constructor(tokenService = new TokenService()) {
    this.tokenService = tokenService;
  }

  verifyToken(token) {
    return this.tokenService.verifyToken(token);
  }
}

module.exports = AuthMiddlewareService;
