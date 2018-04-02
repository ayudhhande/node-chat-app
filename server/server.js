const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Connected to server.');

    socket.emit('newMessage', {
        from: "mike@email.com",
        text: "How are you?",
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('newMessage', message);
    });

    socket.on('disconnect', ()=> {
        console.log('Disconnected from server.')
    });
});

server.listen(port, () => {
    console.log(`Started at port: ${port}`);
});
