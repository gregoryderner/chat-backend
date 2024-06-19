const WebSocketController = require('../../presentation/controllers/WebSocketController');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

function setupWebSocket(wss) {
  wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        ws.userId = decoded.id; // Usar o campo ID do user
        console.log(`User connected: ${ws.userId}`);
      } catch (err) {
        console.error('Invalid token', err);
      }
    }

    WebSocketController.handleConnection(ws, wss);

    ws.on('close', () => {
      WebSocketController.handleClose(ws);
    });
  });
}

module.exports = { setupWebSocket };
