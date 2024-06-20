const Message = require('../../domain/entities/Message');
const IdService = require('../services/IdService');
const EncryptionService = require('../services/EncryptionService');

class SendMessageUseCase {
  constructor(messageRepository, encryptionService = new EncryptionService()) {
    this.messageRepository = messageRepository;
    this.encryptionService = encryptionService;
  }

  async execute({ content, sender, receiver, publicKey }) {
    const encryptedContent = this.encryptionService.encryptMessage(content, publicKey);
    const message = new Message({
      id: IdService.generateId(),
      content: encryptedContent,
      sender,
      receiver,
      timestamp: new Date()
    });

    return this.messageRepository.save(message);
  }
}

module.exports = SendMessageUseCase;
