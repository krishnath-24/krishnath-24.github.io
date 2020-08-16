// require the modules
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

//  use google strategy
passport.use(new googleStrategy({
        clientID : '',
        clientSecret : '',
        callbackURL : 'http://localhost:8000/users/auth/google/callback',
        passReqToCallback : true
    },

    // callback function
    function(req,accessToken, refreshToken, profile, done) {

        // check if the user already exists
        User.findOne({email : profile.emails[0].value}).exec(
            
            async function(error, user) {

                // handle any error
                if(error) {
                    console.log(error + ' in google strategy passport');
                    return;
                }
                if(user) return done(null,user); // if the user is found
                else {

                    // create the user and store in the db
                    try {
                        // hash the password using bcrypt
                        const hashedPassword = await bcrypt.hash(profile.displayName,10);
                        User.create({
                            name : profile.displayName,
                            email : profile.emails[0].value,
                            password : hashedPassword

                        }, function(error, user){
                            
                            if(error) { // if some error occured ,user was not created
                                req.flash('error',error);
                                return done(null,false);
                            }

                            if(!user) {
                                req.flash('error','Unable to create the user!');
                                return res.redirect('back');
                            }

                            // if user was created
                            return done(null, user);
                        });
                            
                    } catch (error) {
                        req.flash('error',error);
                        return done(null, false);
                    }
                }
            }
        )
    }
));