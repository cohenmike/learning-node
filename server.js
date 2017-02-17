'use strict';

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

io.on('connection', (socket) => {
  socket.on('user joined', (name) => {
    socket.username = name;
    io.emit('chat message', `${name} has joined.`);
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', `${socket.username}: ${msg}`);
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(8080);
