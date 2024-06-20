require('dotenv').config();
const setupServer = require('./setupServer');
const setupWebSocketServer = require('../infrastructure/websocket/setupWebSocketServer');
const { setupRoutes } = require('../presentation/routes');
const { createTables } = require('../infrastructure/database/migrations/createTables');
const LoggingService = require('../presentation/services/LoggingService');
const ConsoleLogger = require('../presentation/services/ConsoleLogger');

const loggingService = new LoggingService(new ConsoleLogger());
const { app, server } = setupServer();
setupRoutes(app);
const wss = setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;

createTables().then(() => {
  server.listen(PORT, () => {
    loggingService.info(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  loggingService.error('Error creating tables:', error);
});
