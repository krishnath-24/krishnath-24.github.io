const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose');


app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine','ejs');
app.set('views',__dirname + '/views');


app.use('/users',require('./routes/users'));

app.get('/',(req, res)=>{
    res.send('Hi');
});


app.listen(port,()=>{
    console.log('listening on port : ' + port);
});