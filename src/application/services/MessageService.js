class MessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async getMessagesByReceiver(userId) {
    return await this.messageRepository.findByReceiver(userId);
  }
}

module.exports = MessageService;
