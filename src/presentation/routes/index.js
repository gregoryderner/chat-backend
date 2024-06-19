const express = require('express');
const authRoutes = require('./authRoutes');
const messageRoutes = require('./messageRoutes');

function setupRoutes(app) {
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/messages', messageRoutes);
}

module.exports = { setupRoutes };
