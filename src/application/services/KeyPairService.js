const NodeRSA = require('node-rsa');

class KeyPairService {
  constructor(keySize = 512) {
    this.key = new NodeRSA({ b: keySize });
  }

  generateKeyPair() {
    return {
      publicKey: this.key.exportKey('public'),
      privateKey: this.key.exportKey('private')
    };
  }
}

module.exports = KeyPairService;