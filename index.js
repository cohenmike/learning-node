'use strict'
let fs = require('fs');

fs.readFile("README2.md", function(err, data){
    if (err != null){
        console.log(err.toString()); 
        return;
    }

    console.log(data.toString());
});