const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('join-trip', (tripId) => {
      socket.join(`trip:${tripId}`);
      console.log(`Socket ${socket.id} joined trip ${tripId}`);
    });

    socket.on('expense:added', (data) => {
      io.to(`trip:${data.tripId}`).emit('activity', {
        type: 'EXPENSE_ADDED',
        payload: data,
        timestamp: new Date(),
      });
    });

    socket.on('photo:uploaded', (data) => {
      io.to(`trip:${data.tripId}`).emit('activity', {
        type: 'PHOTO_UPLOADED',
        payload: data,
        timestamp: new Date(),
      });
    });

    socket.on('vote', (data) => {
      io.to(`trip:${data.tripId}`).emit('activity', {
        type: 'VOTE_CAST',
        payload: data,
      });
    });

    socket.on('item:claimed', (data) => {
      io.to(`trip:${data.tripId}`).emit('activity', {
        type: 'ITEM_CLAIMED',
        payload: data,
      });
    });

    socket.on('pin:added', (data) => {
      io.to(`trip:${data.tripId}`).emit('activity', {
        type: 'PIN_ADDED',
        payload: data,
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});