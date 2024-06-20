class User {
  constructor({ id, username, password, publicKey }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.publicKey = publicKey;
  }
}

module.exports = User;
