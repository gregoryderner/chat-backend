jest.setTimeout(30000); // 30 seconds

const { createTables } = require('./tests/setupDatabase');

beforeAll(async () => {
  await createTables();
});
