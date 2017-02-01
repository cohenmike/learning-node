'use strict'
let fs = require('fs');

fs.readFile("README.md", function(err, data){
    if (err != null){
        console.log(err.toString()); 
        return;
    }

    console.log(data.toString());
});

let rogueOne = function(foo, callback){
    process.nextTick(function(){console.log(foo);});
    process.nextTick(callback);
}

console.log("Starting...");

rogueOne("R2D2", function(){
    console.log("Found R2");
});

rogueOne("C3P0", function(){
    console.log("Found 3P0")
});

console.log("End...");