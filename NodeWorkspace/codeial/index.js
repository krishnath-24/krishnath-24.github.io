const express = require('express');
const app = express();
const db = require('./config/mongoose');``
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
// const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(expressLayouts);





app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name : 'codeial',
    // TODO to be changed when in production
    secret : 'blah',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 10000
    },
    // store : new MongoStore({
    //     mongooseConnection : db,
    //     autoRemove : 'disabled'
    // })
}));


app.use(passport.initialize());
app.use(passport.session());


// use the express router
app.use('/',require('./routes'));


const port = process.env.port || 7000;

app.listen(port, function(error){
    console.log(`Server running on ${port}`)
});