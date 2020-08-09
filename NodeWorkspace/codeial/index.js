const express = require('express');
const app = express();
const db = require('./config/mongoose');``
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

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
    secret : 'between you and me',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 3000000
    },
    store : new MongoStore({mongooseConnection : db})
}));

// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use the express router
app.use('/',require('./routes'));


const port = process.env.port || 7000;

app.listen(port, function(error){
    console.log(`Server running on ${port}`);   
});