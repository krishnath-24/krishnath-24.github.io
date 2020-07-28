const Post = require('../models/post');

module.exports.createPost = (req, res)=> {
    if(!(req.isAuthenticated())) {
        return res.redirect('/');
    }
    console.log("user id "  + req.user.id);

    Post.create({
        content : req.body.content,
        user : req.user.id
    },(error,post)=>{
        if(error) {
            console.log(error);
            return res.redirect('back');
        }
        console.log(post);
        res.redirect('/');
    });
}