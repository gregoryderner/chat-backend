const express = require('express');
const requestLogger = require('./requestLogger');
const errorHandler = require('./errorHandler');
const cors = require('cors');

function setupMiddlewares(app) {
  const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  //app.use(requestLogger); // Middleware global de logging (opcional)
}

module.exports = setupMiddlewares;
