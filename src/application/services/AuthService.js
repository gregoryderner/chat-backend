const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../infrastructure/database/UserRepository');
const User = require('../../domain/entities/User');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(username, password, publicKey) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ id: this.generateId(), username, password: hashedPassword, publicKey });
    return this.userRepository.save(user);
  }

  async login(username, password) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  async storePublicKey(userId, publicKey) {
    await this.userRepository.storePublicKey(userId, publicKey);
  }

  async getPublicKey(userId) {
    return this.userRepository.getPublicKey(userId);
  }

  generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  }

  generateId() {
    return 'xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
  }
}

module.exports = AuthService;
