const IdService = require('./IdService');

class WebSocketMessageService {
  constructor(messageRepository, userRepository) {
    this.messageRepository = messageRepository;
    this.userRepository = userRepository;
  }

  async handleMessage(ws, parsedMessage, wss) {
    console.log('Received message:', parsedMessage);

    const { content, sender, receiver } = parsedMessage;
    const senderUser = await this.userRepository.findById(sender);
    const message = {
      id: IdService.generateId(),
      content,
      sender,
      receiver,
      senderName: senderUser ? senderUser.username : 'Unknown',
      timestamp: new Date()
    };
    await this.messageRepository.save(message);

    if (receiver === 'public') {
      wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify({ type: 'message', ...message }));
        }
      });
    } else {
      wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN && client.userId === receiver) {
          client.send(JSON.stringify({ type: 'message', ...message }));
        }
      });
    }
  }
}

module.exports = WebSocketMessageService;
