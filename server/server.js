const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Connected to server.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));  //emits an event to single connection

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));//emits an event to EVERY single connection
        callback(); 
    });
   
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', ()=> {
        console.log('Disconnected from server.');
    });
});

server.listen(port, () => {
    console.log(`Started at port: ${port}`);
});
