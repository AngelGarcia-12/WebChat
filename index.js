let express = require('express');
let socket = require('socket.io');

// App setup
let app = express();
let server = app.listen(3000, () => {
    console.log('Listen to the port 3000');
});

// Static files
app.use(express.static('public'));

// Socket setup
let io = socket(server);
io.on('connection', (socket) => {
    console.log('Made sockets connection', socket.id);

    // Handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})