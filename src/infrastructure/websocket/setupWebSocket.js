const WebSocketController = require('../../presentation/controllers/WebSocketController');
const WebSocketAuthService = require('../../application/services/WebSocketAuthService');
const WebSocketMessageService = require('../../application/services/WebSocketMessageService');
const MessageRepository = require('../database/MessageRepository');
const UserRepository = require('../database/UserRepository');
const { db } = require('../database/database');

const messageService = new WebSocketMessageService(new MessageRepository(db), new UserRepository(db));

function setupWebSocket(wss) {
  wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (token) {
      const decoded = WebSocketAuthService.verifyToken(token);
      if (decoded) {
        ws.userId = decoded.id; // Usar o campo ID do user
        console.log(`User connected: ${ws.userId}`);
      }
    }

    WebSocketController.handleConnection(ws, wss, messageService);

    ws.on('close', () => {
      WebSocketController.handleClose(ws);
    });
  });
}

module.exports = { setupWebSocket };
