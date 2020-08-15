// require the modules
const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// use the local strategy
passport.use(new LocalStrategy({
    usernameField : 'email'},
    function(email, password, done){

        User.findOne({email : email},async (error, user) => {
            
            if(error) {
                console.log(error);
                return done(error);
            }
            else  {

                if(!user) {
                    return done(null, false);
                }
                try {
                    const result = await bcrypt.compare(password, user.password);
                    if(result) return done(null, user);

                    else return done(null, false);
                    
                } catch (error) {
                    console.log(error);
                    return done(null, false);
                }
            }
        });
}));


// serialize the user
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

// deserialize the user
passport.deserializeUser((id,done) => {

    User.findById(id, (error, user) => {
        
        if(error) {
            return done(error);
        }
        return done(null, user);
    });
});


//  check if the user is authenticated
passport.checkAuthenticated = (req, res, next) => {

    if(req.isAuthenticated()) {
       return next();
    }
    return res.redirect('/users/sign-in');
}

// set the authenticated user
passport.setAuthenticatedUser = (req, res, next) => {

    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

// check if the user is not authenticated
passport.checkNotAuthenticated = (req, res, next) => {

    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    next();
}

//  export the passport
module.exports = passport;