const EncryptionService = require('../src/application/services/EncryptionService');

describe('EncryptionService', () => {
  let encryptionService;
  let keyPair;

  beforeEach(() => {
    encryptionService = new EncryptionService();
    keyPair = encryptionService.generateKeyPair();
  });

  test('should generate a key pair', () => {
    expect(keyPair).toHaveProperty('publicKey');
    expect(keyPair).toHaveProperty('privateKey');
  });

  test('should encrypt and decrypt a message', () => {
    const message = 'Hello, world!';
    const encryptedMessage = encryptionService.encryptMessage(message, keyPair.publicKey);
    const decryptedMessage = encryptionService.decryptMessage(encryptedMessage, keyPair.privateKey);

    expect(decryptedMessage).toBe(message);
  });

  test('should throw an error for invalid public key', () => {
    const invalidPublicKey = 'invalid-public-key';
    const message = 'Hello, world!';

    expect(() => {
      encryptionService.encryptMessage(message, invalidPublicKey);
    }).toThrow();
  });

  test('should throw an error for invalid private key', () => {
    const invalidPrivateKey = 'invalid-private-key';
    const encryptedMessage = encryptionService.encryptMessage('Hello, world!', keyPair.publicKey);

    expect(() => {
      encryptionService.decryptMessage(encryptedMessage, invalidPrivateKey);
    }).toThrow();
  });
});
