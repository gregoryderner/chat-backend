class IMessageRepository {
  save(message) {
    throw new Error('Method not implemented.');
  }

  findByReceiver(receiver) {
    throw new Error('Method not implemented.');
  }
}

module.exports = IMessageRepository;
