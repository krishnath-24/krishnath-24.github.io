const User = require('../models/User');
const bcrypt = require('bcrypt');
const { readyState } = require('../config/mongoose');


module.exports.signUp = (req, res) => {
    return res.render('signup');
}

module.exports.signIn = (req, res) => {
    return res.render('signin');
}

module.exports.create = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        User.create({
            email : req.body.email,
            password : hashedPassword
        },(error,user)=>{
            
            if(error) {
                console.log(error);
            }
            else console.log('user created : ' + user);
        });

        return res.redirect('/users/profile');
    
    } catch (error) {
        return res.redirect('back');
    }
}

module.exports.createSession = (req, res) => {

    User.findOne({email : req.body.email},(error, user)=>{
        if(error || user.password != req.body.password) {

            return res.redirect('back');
        }
        return res.redirect('/users/profile');
    });
}

module.exports.profile = (req, res) => {
    
    return res.render('profile');
}


module.exports.logout = (req, res) => {

    req.logout();
    res.redirect('/users/sign-in');

}

module.exports.passwordUpdateForm = (req, res) => {
    return res.render('reset_password');
}

module.exports.resetPassword = (req, res) => {

    const {oldPassword, newPassword,confirmPassword} = req.body;

    if(newPassword != confirmPassword) {
        return res.redirect('/');
    }

    User.findOne({email : req.user.email},async (error, user) => {

        

        try {

            if(error || !user) {
                return res.redirect('back');
            }
            const result = await bcrypt.compare(oldPassword,user.password);
            const hashedPassword = await bcrypt.hash(newPassword,10);

            if(result) {

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
            }
        } catch (error) {
            console.log(error + ' here');
            return res.redirect('/users/profile');
        }
    });
}