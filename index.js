const express = require('express');
const { Server: WebSocketServer } = require('ws');

const logger = console;

// Express magic

const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => logger.log(`Listening on ${PORT}`));

// WebSocket magic

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  logger.log('Client connected');
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(message);
    });
  });
  ws.on('close', () => logger.log('Client disconnected'));
});
