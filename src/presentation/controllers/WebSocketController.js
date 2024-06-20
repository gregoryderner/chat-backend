class WebSocketController {
  // Método para lidar com novas conexões WebSocket
  static handleConnection(ws, wss, messageService) {
    ws.wss = wss;

    ws.on('message', async (message) => {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === 'message') {
        await messageService.handleMessage(ws, parsedMessage, wss);
      }
    });
  }

  // Método para lidar com o fechamento de conexões WebSocket
  static handleClose(ws) {
    console.log('Connection closed:', ws.userId);
  }
}

module.exports = WebSocketController;
