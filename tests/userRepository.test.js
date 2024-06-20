const sqlite3 = require('sqlite3').verbose();
const UserRepository = require('../src/infrastructure/database/UserRepository');
const User = require('../src/domain/entities/User');

let db;
let userRepository;

beforeAll(() => {
  db = new sqlite3.Database(':memory:');
  userRepository = new UserRepository(db);
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT, password TEXT, publicKey TEXT)`, (err) => {
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

describe('UserRepository', () => {
  afterEach(() => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM users`, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });

  test('should save a user', async () => {
    const user = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    const savedUser = await userRepository.save(user);

    expect(savedUser).toEqual(user);

    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = ?`, ['1'], (err, row) => {
        if (err) {
          return reject(err);
        }
        expect(row).toEqual({ ...user });
        resolve();
      });
    });
  });

  test('should find a user by username', async () => {
    const user = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    await userRepository.save(user);

    const foundUser = await userRepository.findByUsername('testuser');

    expect(foundUser).toEqual(user);
  });

  test('should find a user by id', async () => {
    const user = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    await userRepository.save(user);

    const foundUser = await userRepository.findById('1');

    expect(foundUser).toEqual(user);
  });

  test('should store public key for a user', async () => {
    const user = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    await userRepository.save(user);

    await userRepository.storePublicKey('1', 'newPublicKey123');

    return new Promise((resolve, reject) => {
      db.get(`SELECT publicKey FROM users WHERE id = ?`, ['1'], (err, row) => {
        if (err) {
          return reject(err);
        }
        expect(row.publicKey).toBe('newPublicKey123');
        resolve();
      });
    });
  });

  test('should get public key for a user', async () => {
    const user = new User({ id: '1', username: 'testuser', password: 'password123', publicKey: 'publicKey123' });
    await userRepository.save(user);

    const publicKey = await userRepository.getPublicKey('1');

    expect(publicKey).toBe('publicKey123');
  });
});
