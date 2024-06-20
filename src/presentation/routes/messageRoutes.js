const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requestLogger = require('../middlewares/requestLogger');

const createMessageRoutes = (messageService, loggingService) => {
  const router = express.Router();

  router.use(requestLogger);

  router.get('/private', authMiddleware, async (req, res) => {
    try {
      loggingService.info(`User ${req.userId} is authenticated`);
      const messages = await messageService.getMessagesByReceiver(req.userId);
      loggingService.info(`Messages retrieved: ${messages.length}`);
      res.status(200).json(messages);
    } catch (error) {
      loggingService.error('Error retrieving messages:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

module.exports = createMessageRoutes;
