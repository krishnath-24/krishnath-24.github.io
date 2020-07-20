const User = require('../models/user');


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('signup',{
        title : 'sign up page'
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('signin',{
        title : 'sign in page'
    });
}


// get the sign up data
module.exports.create = function(req, res){

    console.log(req.body);

    if(req.body.password != req.body.confirm_password){
        return res.redirect('/users/sign-up');
    }

    User.findOne({email : req.body.email},(err,user)=>{
        
        if(err) {console.log(err); return;}

        if(!user) {
            User.create(req.body,(err, user)=>{
                
                if(err) {console.log(err); return;}
                

                res.redirect('/users/sign-in');
            });
        } else {

            return res.redirect('back');
        }
    });

}

//sign in and create a session for the user
module.exports.createSession = function(req, res) {
    // TODO later
    
    return res.redirect('/users/profile');
}


// render the profile of the user
module.exports.profile = (req,res) => {
    
    return res.render('users',{
        title : 'profile'
    });
}