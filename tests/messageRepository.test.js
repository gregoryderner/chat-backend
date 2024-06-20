const sqlite3 = require('sqlite3').verbose();
const MessageRepository = require('../src/infrastructure/database/MessageRepository');
const Message = require('../src/domain/entities/Message');

let db;
let messageRepository;

beforeAll(() => {
  db = new sqlite3.Database(':memory:');
  messageRepository = new MessageRepository(db);
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE messages (id TEXT PRIMARY KEY, content TEXT, sender TEXT, receiver TEXT, timestamp TEXT)`, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
});

afterAll(() => {
  db.close();
});

describe('MessageRepository', () => {
  afterEach(() => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM messages`, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });

  test('should save a message', async () => {
    const message = new Message({ id: '1', content: 'Hello', sender: 'user1', receiver: 'user2', timestamp: new Date().toISOString() });
    const savedMessage = await messageRepository.save(message);

    expect(savedMessage).toEqual(message);

    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM messages WHERE id = ?`, ['1'], (err, row) => {
        if (err) {
          return reject(err);
        }
        expect(row).toEqual({ ...message });
        resolve();
      });
    });
  });

  test('should find messages by receiver', async () => {
    const messages = [
      new Message({ id: '1', content: 'Hello', sender: 'user1', receiver: 'user2', timestamp: new Date().toISOString() }),
      new Message({ id: '2', content: 'Hi', sender: 'user1', receiver: 'user2', timestamp: new Date().toISOString() })
    ];

    await Promise.all(messages.map(msg => messageRepository.save(msg)));

    const foundMessages = await messageRepository.findByReceiver('user2');

    expect(foundMessages).toEqual(messages);
  });
});
