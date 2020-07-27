const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;



// use local Strategy for authentication
passport.use(new LocalStrategy({
    usernameField : 'email',
    function(email, password, done) {

        // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {

        // if there is some error in finding the user
        if (err) { return done(err); }

        // if user is not present
        if (!user || user.password != password) { 
            
            console.log('Incorrect username/password')
            return done(null, false); 
        }
        
        return done(null, user);
      });
    }
}));

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
});


// desrialize the user from the key in the cookie

passport.deserializeUser((id,done)=>{

    User.findById(id,(error,user)=>{
        if(error){
            console.log("error in finding the user --> Passport");
            return done(error);
        } 

        return done(null,user);
    });
});