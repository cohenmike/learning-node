'use strict'
let expect = require("chai").expect;
let request = require("request");

describe("Server", function(){
    describe("Client Connected", function(){
        let url = "http://localhost:8080";
        it("return status 200", function(done){
            request(url, function(err, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            });
        })
    });
});