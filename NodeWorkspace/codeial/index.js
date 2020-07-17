const express = require('express');

const app = express();

// use the express router
app.use('/',require('./routes'));


const port = process.env.port || 8000;

app.listen(port, function(error){
    console.log(`Server running on ${port}`)
});