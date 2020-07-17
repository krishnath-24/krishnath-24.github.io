const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

// use the express router
app.use('/',require('./routes'));



const port = process.env.port || 8000;

app.listen(port, function(error){
    console.log(`Server running on ${port}`)
});