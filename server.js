'use strict'
var app = require("express")();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('user joined', function(name){
        socket.username = name;
        io.emit('chat message', name + " has joined.");
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', socket.username + ': ' + msg);
    });
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);