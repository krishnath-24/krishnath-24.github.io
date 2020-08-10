const User = require('../models/user');


module.exports.profile = async function(req, res){

    try{

        let user  = await User.findById(req.params.id);

        return res.render('profile', {
            title: 'User Profile',
            currUser : user
        });

    } catch(error) {

        req.flash('error',error);
        res.redirect('back');
    }
}

module.exports.update = async function(req,res) {
    
    try {
        if(req.user.id == req.params.id) {

            let user = await User.findByIdAndUpdate(req.params.id,req.body);
            req.flash('success','user updated successfully');
            res.redirect('/');
        } else {
            res.status(401).send('Unauthorized');
        }

    } catch (error) {
        req.flash('error',error);
        res.redirect('back');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
        req.flash('error','Please login.');
        return res.redirect('/');
    } 

    return res.render('signup', {
        title: "Codeial | Sign Up"
    });
}


// render the sign in page
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        req.flash('error','Please login.');
        return res.redirect('/');
    }

    return res.render('signin', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = async function(req, res){

    try {
        
        let user = await User.findOne({email: req.body.email});

        if(!user) await User.create(req.body);
        
        return res.redirect('/user/sign-in');

    } catch (error) {

        req.flash('error',error);
        res.redirect('back');
    }

}

// sign out the user
module.exports.signOut = (req,res)=>{
    req.logout();
    req.flash('success','Signed out successfuly');
    return res.redirect('/');
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){

    req.flash('success','signed in successfuly');
    return res.redirect('/');
}