const express = require('express');
const createAuthRoutes = require('./authRoutes');
const createMessageRoutes = require('./messageRoutes');
const setupMiddlewares = require('../middlewares/middlewareSetup');
const errorHandler = require('../middlewares/errorHandler');
const { db } = require('../../infrastructure/database/database');
const UserRepository = require('../../infrastructure/database/UserRepository');
const MessageService = require('../../application/services/MessageService');
const MessageRepository = require('../../infrastructure/database/MessageRepository');
const AuthService = require('../../application/services/AuthService');
const UserService = require('../../application/services/UserService');
const TokenService = require('../../application/services/TokenService');
const AuthController = require('../controllers/AuthController');
const LoggingService = require('../services/LoggingService');
const ConsoleLogger = require('../services/ConsoleLogger');

function setupRoutes(app) {
  const userRepository = new UserRepository(db);
  const messageService = new MessageService(new MessageRepository(db));
  const loggingService = new LoggingService(new ConsoleLogger());

  const authService = new AuthService(new UserService(userRepository), new TokenService());
  const authController = new AuthController(authService);

  setupMiddlewares(app);

  app.use('/api/auth', createAuthRoutes(authController));
  app.use('/api/messages', createMessageRoutes(messageService, loggingService));
  app.use(errorHandler); // Middleware de tratamento de erros
}

module.exports = { setupRoutes };
