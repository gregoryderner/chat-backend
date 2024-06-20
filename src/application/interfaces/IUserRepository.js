class IUserRepository {
  save(user) {
    throw new Error('Method not implemented.');
  }

  findByUsername(username) {
    throw new Error('Method not implemented.');
  }

  findById(id) {
    throw new Error('Method not implemented.');
  }

  storePublicKey(userId, publicKey) {
    throw new Error('Method not implemented.');
  }

  getPublicKey(userId) {
    throw new Error('Method not implemented.');
  }

  clear() {
    throw new Error('Method not implemented.');
  }
}

module.exports = IUserRepository;
