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

    socket.on('disconnect', ()=> {
        console.log('Disconnected from server.')
    });
});

server.listen(port, () => {
    console.log(`Started at port: ${port}`);
});

// module.exports = 