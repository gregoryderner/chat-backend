const TokenService = require('./TokenService');
const tokenService = new TokenService();

class WebSocketAuthService {
  static verifyToken(token) {
    try {
      return tokenService.verifyToken(token);
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }
}

module.exports = WebSocketAuthService;
