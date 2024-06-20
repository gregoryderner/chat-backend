const MessageRepository = require('../../infrastructure/database/MessageRepository');
const UserRepository = require('../../infrastructure/database/UserRepository');
const messageRepository = new MessageRepository();
const userRepository = new UserRepository();

class WebSocketController {
  static async handleConnection(ws, wss) {
    ws.wss = wss;

    ws.on('message', async (message) => {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === 'message') {
        await WebSocketController.handleMessage(ws, parsedMessage);
      }
    });
  }

  static async handleMessage(ws, parsedMessage) {
    console.log('Received message:', parsedMessage);

    const { content, sender, receiver } = parsedMessage;
    const senderUser = await userRepository.findById(sender);
    const message = {
      id: WebSocketController.generateId(),
      content,
      sender,
      receiver,
      senderName: senderUser ? senderUser.username : 'Unknown',
      timestamp: new Date()
    };
    await messageRepository.save(message);

    // Enviar mensagem a todos os clientes conectados se for uma mensagem pública
    if (receiver === 'public') {
      ws.wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify({ type: 'message', ...message }));
        }
      });
    } else {
      // Enviar mensagem apenas para o destinatário especificado
      ws.wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN && client.userId === receiver) {
          client.send(JSON.stringify({ type: 'message', ...message }));
        }
      });
    }
  }

  static handleClose(ws) {
    console.log('Connection closed:', ws.userId);
  }

  static generateId() {
    return 'xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
  }
}

module.exports = WebSocketController;
