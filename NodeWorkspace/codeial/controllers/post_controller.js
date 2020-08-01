const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = (req, res)=> {
    
    Post.create({
        content : req.body.content,
        user : req.user.id

    },(error,post)=>{
        if(error) {
            console.log(error);
            return res.redirect('back');
        }
        res.redirect('/');
    });
}

module.exports.destroy = (req, res) => {

    Post.findById(req.params.id,(error,post)=>{

        if(post) {
            if(post.user == req.user.id) {
                post.remove();
                
                Comment.deleteMany({post : req.params.id},(error)=>{
                    return res.redirect('back');
                });
            }
        }
        else {
            return res.redirect('back');
        }
    });
}