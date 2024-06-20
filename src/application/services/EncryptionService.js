const NodeRSA = require('node-rsa');

class EncryptionService {
  encryptMessage(message, publicKey) {
    const key = new NodeRSA(publicKey);
    return key.encrypt(message, 'base64');
  }

  decryptMessage(encryptedMessage, privateKey) {
    const key = new NodeRSA(privateKey);
    return key.decrypt(encryptedMessage, 'utf8');
  }
}

module.exports = EncryptionService;
