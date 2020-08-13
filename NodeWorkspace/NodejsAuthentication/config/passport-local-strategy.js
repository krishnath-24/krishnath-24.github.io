const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField : 'email'},
    function(email, password, done){

        User.findOne({email : email},(error, user) => {
            
            if(error) {
                console.log(error);
                return done(error);
            }

            else if(!user || user.password != password) {

                console.log('incorrect username/password');
                done(null, false);

            }
            else return done(null, user);
            
        });
}));


passport.serializeUser((user, done) => {
    return done(null, user.id);
});


passport.deserializeUser((id,done) => {

    User.findById(id, (error, user) => {
        
        if(error) {
            console.log(error);
            return done(error);
        }

        return done(null, user);
    });
});



passport.checkAuthenticated = (req, res, next) => {

    if(req.isAuthenticated()) {
       return next();
    }
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = (req, res, next) => {

    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

passport.checkNotAuthenticated = (req, res, next) => {

    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    next();
}


module.exports = passport;