// require the necessary modules
const User = require('../models/User');
const bcrypt = require('bcrypt');

// action to sign up the user
module.exports.signUp = (req, res) => {
    return res.render('signup');
}

// action to sign in the user
module.exports.signIn = (req, res) => {
    return res.render('signin');
}

//  action to create the user
module.exports.create = async (req, res) => {
    try {

        // hash the password using salt before storing
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        // create the user
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        },(error,user)=>{
            
            if(error) {
                req.flash('error', error);
                return res.redirect('/users/sign-in');
            } 
        });

        return res.redirect('/users/profile');
    
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
}

// action to create the user session
module.exports.createSession = (req, res) => {

    User.findOne({email : req.body.email},(error, user)=>{
        if(error) {
            return res.redirect('back');
        }
        
        req.flash('success','Signed In successfully');
        return res.redirect('/users/profile');
    });
}


// action to handle the user's profile route
module.exports.profile = (req, res) => {
    return res.render('profile');
}

// action to log the user out
module.exports.logout = (req, res) => {

    req.logout();
    req.flash('success','Logged out');
    res.redirect('/users/sign-in');

}

// action to handle the password reset route
module.exports.passwordUpdateForm = (req, res) => {
    
    return res.render('reset_password');
}

// action to update the user's password
module.exports.resetPassword = (req, res) => {

    const {oldPassword, newPassword,confirmPassword} = req.body;

    if(newPassword != confirmPassword) {
        req.flash('error','The entered passwords dont match');
        return res.redirect('/');
    }

    // find the user in the database
    User.findOne({email : req.user.email},async (error, user) => {

        try {

            if(error || !user) {
                return res.redirect('back');
            }

            // compare the old password with the user's password
            const result = await bcrypt.compare(oldPassword,user.password);
            const hashedPassword = await bcrypt.hash(newPassword,10);

            if(result) { // if the user's password matches

                // update the user
                await User.findOneAndUpdate({email : user.email},{
                    email : user.email,
                    password : hashedPassword
                },
                    (error, updatedUser) => {
                        if(error) {
                            console.log(error);
                            return res.redirect('back');
                        }
                        return res.redirect('/');
                    });
            } else {
                // the password entered was incorrect
                req.flash('error','Incorrect old password');
                return res.redirect('/');
            }
        } catch (error) {

            // if there was some error
            req.flash('error',error);
            return res.redirect('/users/profile');
        }
    });
}

