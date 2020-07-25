// require all the modules
const express =  require('express');
const app = express();
const port = process.env.port || 3000; // define the port
const bodyParser = require('body-parser');

// set the view engine to render ejs files
app.set('view engine','ejs');

// use the assets folder
app.use(express.static('assets'));

//use the body parser to parse form data
app.use(bodyParser.urlencoded({extended:true}));

// make db connection
const db = require('./config/mongoose');

// require the data model
const Habit = require('./models/habit');

// use the routes
app.use('/',require('./routes'));

//set the views folder
app.set('views','./views');



// listen on port and start the server
app.listen(port,(error)=>{

    // if error occurs
    if(error) {
        console.log(error);
        return;
    }

    // server starts successfuly
    console.log(`Server running on port ${port}`);
});