const express = require('express');
const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

// use the express router
app.use('/',require('./routes'));



const port = process.env.port || 8000;

app.listen(port, function(error){
    console.log(`Server running on ${port}`)
});