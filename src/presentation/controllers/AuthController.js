class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res, next) {
    try {
      const { username, password, publicKey } = req.body;
      const user = await this.authService.register(username, password, publicKey);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const { user, token } = await this.authService.login(username, password);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async storePublicKey(req, res, next) {
    try {
      const { userId, publicKey } = req.body;
      await this.authService.storePublicKey(userId, publicKey);
      res.status(200).json({ message: 'Public key stored successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getPublicKey(req, res, next) {
    try {
      const { userId } = req.params;
      const publicKey = await this.authService.getPublicKey(userId);
      res.status(200).json({ publicKey });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
