var socket = io();

socket.on('connect', function(){
console.log('Connected to client.');
    socket.emit('createMessage', {
        from:"Annie@email.com",
        text:"from client"
    });
    
});

socket.on('disconnect ', function(){
    console.log('Disconnected from client');
});

socket.on('newMessage', function(message){
    console.log('new Message', message);
});

