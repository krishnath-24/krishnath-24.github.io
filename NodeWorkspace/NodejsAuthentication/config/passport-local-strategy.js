const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

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