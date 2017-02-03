'use strict'
var app = require("express")();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);