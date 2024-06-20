const MessageService = require('../src/application/services/MessageService');
const MessageRepository = require('../src/infrastructure/database/MessageRepository');

jest.mock('../src/infrastructure/database/MessageRepository');

describe('MessageService', () => {
  let messageService;
  let messageRepository;

  beforeEach(() => {
    messageRepository = new MessageRepository();
    messageService = new MessageService(messageRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should get messages by receiver', async () => {
    const mockMessages = [
      { id: '1', content: 'Hello', sender: 'user1', receiver: 'user2', timestamp: new Date() },
      { id: '2', content: 'Hi', sender: 'user1', receiver: 'user2', timestamp: new Date() },
    ];
    messageRepository.findByReceiver.mockResolvedValue(mockMessages);

    const messages = await messageService.getMessagesByReceiver('user2');

    expect(messages).toEqual(mockMessages);
    expect(messageRepository.findByReceiver).toHaveBeenCalledWith('user2');
  });
});
