const express =  require('express');
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
app.set('view engine','ejs');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));

const db = require('./config/mongoose');
const Habit = require('./models/habit');
app.use('/',require('./routes'));







app.listen(port,(error)=>{

    if(error) {
        console.log(error);
        return;
    }

    console.log(`Server running on port ${port}`);
});