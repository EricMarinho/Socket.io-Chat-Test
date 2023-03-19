var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

io.on('connection', function (socket) {
    console.log('a user connected', socket.id);
    socket.emit('message', 'Hello from server');
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('enterCode', code => {
        socket.join(code);
    })
    socket.on('messageFromFront', data => {
        io.to(data.code).emit('messageFromAnotherUser', data.message);
    })

});

http.listen(3000, function () {
    console.log('Servidor rodando em: http://localhost:3000');
});