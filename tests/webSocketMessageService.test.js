const WebSocketMessageService = require('../src/application/services/WebSocketMessageService');
const MessageRepository = require('../src/infrastructure/database/MessageRepository');
const UserRepository = require('../src/infrastructure/database/UserRepository');
const IdService = require('../src/application/services/IdService');

jest.mock('../src/infrastructure/database/MessageRepository');
jest.mock('../src/infrastructure/database/UserRepository');
jest.mock('../src/application/services/IdService');

describe('WebSocketMessageService', () => {
  let messageService;
  let messageRepository;
  let userRepository;
  let idService;

  beforeEach(() => {
    messageRepository = new MessageRepository();
    userRepository = new UserRepository();
    messageService = new WebSocketMessageService(messageRepository, userRepository);
    idService = IdService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle message and save it to repository', async () => {
    const ws = { OPEN: 1, readyState: 1, send: jest.fn() };
    const wss = { clients: [ws] };
    const parsedMessage = { type: 'message', content: 'Hello', sender: 'user1', receiver: 'user2' };
    const senderUser = { id: 'user1', username: 'sender' };
    const generatedId = 'generated-id';

    userRepository.findById.mockResolvedValue(senderUser);
    idService.generateId.mockReturnValue(generatedId);

    await messageService.handleMessage(ws, parsedMessage, wss);

    expect(userRepository.findById).toHaveBeenCalledWith('user1');
    expect(idService.generateId).toHaveBeenCalled();
    expect(messageRepository.save).toHaveBeenCalledWith({
      id: generatedId,
      content: 'Hello',
      sender: 'user1',
      receiver: 'user2',
      senderName: 'sender',
      timestamp: expect.any(Date),
    });
    expect(ws.send).toHaveBeenCalledWith(expect.stringContaining('"type":"message"'));
  });
});
