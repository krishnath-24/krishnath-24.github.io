const User = require('../models/User');
const bcrypt = require('bcrypt');


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
    res.clearCookie('nodeauth');
    res.redirect('/users/sign-in');

}