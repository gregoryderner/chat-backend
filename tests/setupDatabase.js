const path = require('path');
const { initDatabase } = require('../src/infrastructure/database/database');

const dbPath = path.resolve(__dirname, '../database/chat-app-test.db');
const { db, createTables } = initDatabase(dbPath);

module.exports = { db, createTables };
