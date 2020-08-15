const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const notyMiddleware = require('./config/noty-middleware');
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());    

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/assets'));


app.use(session({
    name : 'nodeauth',
    secret : 'between you and me Aakash',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 300000
    },
    store : new MongoStore({mongooseConnection : db})
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(notyMiddleware.setFlash);

app.use('/users',require('./routes/users'));

app.get('/',(req, res) => {
    return res.redirect('/users/sign-in');
});

app.listen(port,()=>{
    console.log('listening on port : ' + port);
});