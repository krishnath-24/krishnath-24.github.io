const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;



// use local Strategy for authentication
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true},
    function(req,email, password, done) {

        // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {

        // if there is some error in finding the user
        if (err) { 
            req.flash('error',err);
            return done(err); 
        }

        // if user is not present
        if (!user || user.password != password) { 
            
            req.flash('error','Incorrect username/password');
            return done(null, false); 
        }
        
        return done(null, user);
      });
    }
));

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
});


// deserialize the user from the key in the cookie

passport.deserializeUser((id,done)=>{

    User.findById(id,(error,user)=>{
        if(error){
            console.log("error in finding the user --> Passport");
            return done(error);
        } 
        return done(null,user);
    });
});


// check if user is authenticated
passport.checkAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}

// set authenticated user
passport.setAuthenticatedUser = (req, res, next)=>{

    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}



module.exports = passport;