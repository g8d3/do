const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server, path: '/ws' });

app.use(express.static('frontend/public'));

// Simple in-memory chat storage (room => messages)
let chats = {};

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'join') {
        ws.room = data.room;
        console.log(`Client joined room ${data.room}`);
      } else if (data.type === 'message') {
        if (!chats[data.room]) chats[data.room] = [];
        chats[data.room].push({ user: data.user, message: data.message });
        
        // Broadcast to all clients in the same room
        wss.clients.forEach(client => {
          if (client !== ws && client.room === data.room) {
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (err) {
      console.error('Invalid message format:', message, err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
