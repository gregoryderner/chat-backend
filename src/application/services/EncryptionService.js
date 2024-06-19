// not in use now
const NodeRSA = require('node-rsa');

class EncryptionService {
  constructor() {
    this.key = new NodeRSA({ b: 512 });
  }

  generateKeyPair() {
    return {
      publicKey: this.key.exportKey('public'),
      privateKey: this.key.exportKey('private')
    };
  }

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
