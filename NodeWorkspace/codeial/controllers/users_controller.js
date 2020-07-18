module.exports.profile = (req,res) => {
    
    return res.render('users',{
        title : 'profile'
    });
}

module.exports.signUp = function(req, res){
    return res.render('signup',{
        title : 'sign up page'
    });
}

module.exports.signIn = function(req, res){
    return res.render('signin',{
        title : 'sign in page'
    });
}