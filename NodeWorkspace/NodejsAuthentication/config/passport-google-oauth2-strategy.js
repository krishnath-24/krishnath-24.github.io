const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new googleStrategy({
        clientID : '',
        clientSecret : '',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
    },

    function(accessToken, refreshToken, profile, done) {

        User.findOne({email : profile.emails[0].value}).exec(
            
            async function(error, user) {

                if(error) {
                    console.log(error + ' in google strategy passport');
                    return;
                }

                if(user) return done(null,user);
                
                else {
                    try {
                        const hashedPassword = await bcrypt.hash(profile.displayName,10);
                        User.create({
                            name : profile.displayName,
                            email : profile.emails[0].value,
                            password : hashedPassword

                        }, function(error, user){
                            
                            if(error) {
                                console.log(error);
                                return;
                            }
                            return done(null, user);
                        });
                            
                    } catch (error) {
                        console.log(error);
                        return done(null, false);
                    }
                }
            }
        )
    }
));