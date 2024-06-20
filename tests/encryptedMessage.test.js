const EncryptionService = require('../src/application/services/EncryptionService');

describe('EncryptionService', () => {
  let encryptionService;
  let keyPair;

  beforeAll(() => {
    encryptionService = new EncryptionService();
    keyPair = encryptionService.generateKeyPair();
  });

  test('should encrypt and decrypt a message', () => {
    const message = 'Hello, world!';
    const encryptedMessage = encryptionService.encryptMessage(message, keyPair.publicKey);
    const decryptedMessage = encryptionService.decryptMessage(encryptedMessage, keyPair.privateKey);

    expect(decryptedMessage).toBe(message);
  });
});
