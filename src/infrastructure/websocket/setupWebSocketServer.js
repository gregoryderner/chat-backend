const WebSocket = require('ws');
const { setupWebSocket } = require('./setupWebSocket');

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({
    server,
    path: '/ws',
    cors: {
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST']
    }
  });

  setupWebSocket(wss);
  return wss;
}

module.exports = setupWebSocketServer;
