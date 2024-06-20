const User = require('../../domain/entities/User');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(username, password, publicKey) {
    const user = new User({ id: this.generateId(), username, password, publicKey });
    return this.userRepository.save(user);
  }

  async findUserByUsername(username) {
    return this.userRepository.findByUsername(username);
  }

  async findUserById(id) {
    return this.userRepository.findById(id);
  }

  async storeUserPublicKey(userId, publicKey) {
    return this.userRepository.storePublicKey(userId, publicKey);
  }

  async getUserPublicKey(userId) {
    return this.userRepository.getPublicKey(userId);
  }

  generateId() {
    return 'xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
  }
}

module.exports = UserService;
