'use strict'
let expect = require("chai").expect;
let request = require("request");
let io = require('socket.io-client');

let serverUrl = "http://localhost:8080";
var options ={
  transports: ['websocket'],
  'force new connection': true
};

describe("Server", function(){
    describe("Client Connected", function(){
        it("return status 200", function(done){
            request(serverUrl, function(err, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            });
        })
    });
    describe("Client submits a message", function(){
        it('broadcast chat message to all users', function(done){
            var client1 = io.connect(serverUrl, options);
            var username = "Hello";
            var message = "World";

            client1.on('connect', function(socket){
                var client2 = io.connect(serverUrl, options);
                
                client2.on('connect', function(socket){
                    client1.emit('user joined', 'Hello');
                    client1.on('user joined', function(name){
                        client1.emit('chat message', message);
                    });
                }); 
                var messageCount = 0;
                client2.on('chat message', function(msg){
                    messageCount += 1;
                    console.log('message received: ' + messageCount + ' : ' + msg);
                    if (messageCount === 1){
                        expect(msg).to.equal(username + ' has joined.')
                    }
                    else{
                        expect(msg).to.equal(username + ': ' + message);
                        client1.disconnect();
                        client2.disconnect();
                        done();
                    }
                });
            });
        });
    })
});