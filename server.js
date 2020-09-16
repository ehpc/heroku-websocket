import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import ws from 'ws';
import hbs from 'hbs';
import './misc/env.js';
import './misc/db.js';
import indexRouter from './routes/chat.js';
import authRouter from './routes/auth.js';
import userMiddleware from './middlewares/user.js';
import routeMiddleware from './middlewares/route.js';
import notFoundMiddleware from './middlewares/notfound.js';
import errorMiddleware from './middlewares/error.js';
import authMiddleware from './middlewares/auth.js';

const logger = console;
const app = express();
const FileStore = sessionFileStore(session);

app.set('view engine', 'hbs');
hbs.registerPartials('views', (err) => {
  if (err) {
    logger.error('Ошибка подключения partials', err);
  }
});

app.set('session cookie name', 'sid');

const sessionMiddleware = session({
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  store: new FileStore({
    secret: process.env.SESSION_SECRET,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

app.use(express.static('public'));
app.use(express.json());
app.use(sessionMiddleware);
app.use(userMiddleware);
app.use(routeMiddleware);

app.use(authRouter);
app.use(authMiddleware, indexRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT ?? 3000;
const httpServer = app.listen(port, () => {
  logger.log('Сервер запущен. Порт:', port);
});

// Websocket application
const wss = new ws.Server({
  // server: httpServer,
  noServer: true,
});

httpServer.on('upgrade', (req, socket, head) => {
  sessionMiddleware(req, {}, () => {
    if (!req.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    wss.handleUpgrade(req, socket, head, (client) => {
      wss.emit('connection', client, req);
    });
  });
});

wss.on('connection', (client) => {
  client.on('message', (message) => {
    logger.log(`received: ${message}`);
    client.send(message);
  });
});
