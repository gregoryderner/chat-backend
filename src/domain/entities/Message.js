class Message {
  constructor({ id, content, sender, receiver, timestamp, encryptedContent }) {
    this.id = id;
    this.content = content;
    this.sender = sender;
    this.receiver = receiver;
    this.timestamp = timestamp;
    this.encryptedContent = encryptedContent;
  }
}

module.exports = Message;
