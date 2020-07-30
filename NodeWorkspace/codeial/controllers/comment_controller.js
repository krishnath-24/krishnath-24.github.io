const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req, res)=>{

    let postId = req.params.id;

    Post.findById(postId, (error, post)=>{

        if(post) {

            Comment.create({
                content : req.body.content,
                user : req.user.id,
                post : postId
            },(error, comment)=>{

                if(comment) {
                    post.comment.push(comment.id);
                    post.save();
                }
            });
        }

        return res.redirect('/');
    });
}