const express = require('express');
const { createServer } = require('http');
const setupMiddlewares = require('../presentation/middlewares/middlewareSetup');

function setupServer() {
  const app = express();
  const server = createServer(app);

  setupMiddlewares(app);

  return { app, server };
}

module.exports = setupServer;
