const User = require('../models/user');


module.exports.profile = function(req, res){

    User.findById(req.params.id,(error,user)=>{
        return res.render('profile', {
            title: 'User Profile',
            currUser : user
        });
    });
}

module.exports.update = function(req,res) {
    console.log(req.user.id == req.params.id);
    if(req.user.id == req.params.id) {
    
        User.findByIdAndUpdate(req.params.id,req.body,(error,user)=>{
 
            console.log(user);
            res.redirect('/');
        });
    } else {

        res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()) return res.redirect('/');

    return res.render('signup', {
        title: "Codeial | Sign Up"
    });
}


// render the sign in page
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()) return res.redirect('/');

    return res.render('signin', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
    
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/user/sign-in');
            });
        }else{
            return res.redirect('back');
        }

    });
}

// sign out the user
module.exports.signOut = (req,res)=>{
    req.logout();
    return res.redirect('/');
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}