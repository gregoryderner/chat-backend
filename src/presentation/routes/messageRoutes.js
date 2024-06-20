const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const MessageRepository = require('../../infrastructure/database/MessageRepository');
const messageRepository = new MessageRepository();

const router = express.Router();

router.get('/private', authMiddleware, async (req, res) => {
console.log("mesagem recebida")
try {
console.log(`User ${req.userId} is authenticated`);
const messages = await messageRepository.findByReceiver(req.userId);
console.log(`Messages retrieved: ${messages.length}`);
res.status(200).json(messages);
} catch (error) {
console.error('Error retrieving messages:', error.message);
res.status(500).json({ error: error.message });
}
});

module.exports = router;