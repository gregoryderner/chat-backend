const Message = require('../../domain/entities/Message');
const EncryptionService = require('../services/EncryptionService');

class SendMessageUseCase {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
    this.encryptionService = new EncryptionService();
  }

  async execute({ content, sender, receiver, publicKey }) {
    const encryptedContent = this.encryptionService.encryptMessage(content, publicKey);
    const message = new Message({
      id: this.generateId(),
      content,
      sender,
      receiver,
      timestamp: new Date(),
      encryptedContent
    });

    return this.messageRepository.save(message);
  }

  generateId() {
    return 'xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
  }
}

module.exports = SendMessageUseCase;
