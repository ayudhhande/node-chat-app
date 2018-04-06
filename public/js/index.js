var socket = io();

socket.on('connect', function(){
    console.log('Connected to client.');   
});

socket.on('disconnect ', function(){
    console.log('Disconnected from client');
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    console.log('location');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target = "_blank">My current location</a>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
    // console.log(jQuery('#messages').append(li));
});

jQuery("#message-form").on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },function(){
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Your browser does not support geolocation');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
    });
});