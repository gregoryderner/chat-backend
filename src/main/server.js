require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const { setupWebSocket } = require('../infrastructure/websocket/setupWebSocket');
const { setupRoutes } = require('../presentation/routes');

const app = express();
const server = createServer(app);

var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

const wss = new WebSocket.Server({
  server, path: '/ws', cors: {
    origin: "http://localhost:3001", // Altere para a URL correta do frontend
    methods: ["GET", "POST"]
  }
});

setupWebSocket(wss);

setupRoutes(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
