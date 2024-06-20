class Message {
  constructor({ id, content, sender, receiver, timestamp }) {
    this.id = id;
    this.content = content;
    this.sender = sender;
    this.receiver = receiver;
    this.timestamp = timestamp;
  }
}

module.exports = Message;
