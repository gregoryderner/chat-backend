const AuthService = require('../../application/services/AuthService');
const authService = new AuthService();

class AuthController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await authService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const { user, token } = await authService.login(username, password);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async storePublicKey(req, res) {
    try {
      const { userId, publicKey } = req.body;
      await authService.storePublicKey(userId, publicKey);
      res.status(200).json({ message: 'Public key stored successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
