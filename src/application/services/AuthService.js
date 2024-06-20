const bcrypt = require('bcrypt');

class AuthService {
  constructor(userService, tokenService, hashService = bcrypt) {
    this.userService = userService;
    this.tokenService = tokenService;
    this.hashService = hashService;
  }

  async register(username, password, publicKey) {
    const hashedPassword = await this.hashService.hash(password, 10);
    return this.userService.registerUser(username, hashedPassword, publicKey);
  }

  async login(username, password) {
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.hashService.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = this.tokenService.generateToken(user);
    return { user, token };
  }

  async storePublicKey(userId, publicKey) {
    await this.userService.storeUserPublicKey(userId, publicKey);
  }

  async getPublicKey(userId) {
    return this.userService.getUserPublicKey(userId);
  }
}

module.exports = AuthService;
