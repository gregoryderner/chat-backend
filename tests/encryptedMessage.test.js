const EncryptionService = require('../src/application/services/EncryptionService');

describe('EncryptionService', () => {
  let encryptionService;
  let keyPair;

  // Configuração inicial antes de todos os testes
  beforeAll(() => {
    encryptionService = new EncryptionService();
    keyPair = encryptionService.generateKeyPair();
  });

  // Teste para criptografar e descriptografar uma mensagem
  test('should encrypt and decrypt a message', () => {
    const message = 'Hello, world!';
    const encryptedMessage = encryptionService.encryptMessage(message, keyPair.publicKey);
    const decryptedMessage = encryptionService.decryptMessage(encryptedMessage, keyPair.privateKey);

    expect(decryptedMessage).toBe(message);
  });
});
