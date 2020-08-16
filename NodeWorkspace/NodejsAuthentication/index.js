//  require all the modules
const express = require('express');
const app = express();
const db = require('./config/mongoose');``
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const bodyParser = require('body-parser');

// use body parser to parse form data
app.use(bodyParser.urlencoded({extended : true}));

// use cookie parser to store cookie
app.use(cookieParser());    

// set the view engine as ejs
app.set('view engine','ejs');

// set the views directory
app.set('views','./views');

// set the static assets folder
app.use(express.static(__dirname + '/assets'));


// use the express session to create user session
app.use(session({
    name : 'nodeauth',
    secret : 'between you and me Aakash',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 300000 // cookie expires after 5 minutes, user logs out after 5 minutes of inactivity
    },
    store : new MongoStore({mongooseConnection : db}) // keep the user logged in if the server restarts
}));


// use the passport
app.use(passport.initialize());

// use the passport session
app.use(passport.session());

// set the user when that user logs in
app.use(passport.setAuthenticatedUser);


// use flash to display messages
app.use(flash());

// use the middleware to set the flash messages
app.use(customMiddleware.setFlash);


// use the users route
app.use('/users',require('./routes/users'));

// home route
app.get('/',(req, res) => {
    return res.redirect('/users/sign-up');
});

// define the port
const port = process.env.PORT || 8000;

// start the server
app.listen(port,()=>{
    console.log('listening on port : ' + port);
});