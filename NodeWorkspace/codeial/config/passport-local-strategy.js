const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email, password, done) {
        // find a user and establish the identity

        User.findOne({email : email},(err, user)=>{
            
            if(err) return done(err);

            if(!user || user.password != password) {

                console.log('Invalid userame/password');
                return done(null, false);
            } 
            else {
                console.log("user was fetched "+ user);
                return done(null, user);
            }
        })
    }
));

// serialize the user to bind the user id to the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deserialize the user from the key in the cookies
passport.deserializeUser(function(id, done){

    User.findById(id,(error,user)=>{
        if(error){
            console.log(error + " while deserializing the user");
            return done(error);
        }

        done(null,user);
    });
});


// check if the user is authenticated
passport.checkAuthenticated = function(req,res,next){

    console.log('checking if req is authenticated')
    // if user is signed in then pass the req to the next function
    if(req.isAuthenticated()) return next();

    // if the user is not signed in
    else res.redirect('/users/sign-in');

}

// set the authenticated user data to pass on to the views

passport.setAuthenticatedUser = function(req,res,next) {

    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}




// export passport
module.exports = passport;