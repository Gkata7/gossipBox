const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// Run when client connects
io.on('connection', socket => {
  console.log('New Connection...');
  socket.emit('message', 'Welcome to the Chat Room!');
})


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));