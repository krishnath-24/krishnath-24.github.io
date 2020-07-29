const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req, res)=>{

    let comment = {
        content : req.body.content,
        user : req.user.id,
        post : req.params.id
    }

    

    Comment.create(comment,(error, comment)=>{

        if(error) {
            console.log(error);
            return res.redirect('/');
        }

        Post.findById(req.params.id,(error,post)=>{
            let newPost = post;
            newPost.comment.push(comment.id);
            Post.findByIdAndUpdate(req.params.id,newPost,(error,post)=>{
                console.log(post);
            });
        });

        console.log(comment);
        return res.redirect('/');
    });
}