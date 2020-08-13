const User = require('../models/User');

module.exports.signUp = (req, res) => {
    return res.render('signup');
}

module.exports.signIn = (req, res) => {
    return res.render('signin');
}

module.exports.create = (req, res) => {
    
    User.create(req.body,(error,user)=>{
        
        if(error) {
            console.log(error);
        }
        else console.log('user created : ' + user);
    });

    return res.redirect('/users/profile');
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