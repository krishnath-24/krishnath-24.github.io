// require the comment model
const Comment = require('../models/comment');

// require the post model
const Post = require('../models/post');


// define the create comment action
module.exports.create = (req, res)=>{

    // fetch id of post on which the comment is made
    let postId = req.params.id;

    // find the post
    Post.findById(postId, (error, post)=>{

        if(post) { // if the post is found

            // create the comment
            Comment.create({
                content : req.body.content,
                user : req.user.id,
                post : postId
            },(error, comment)=>{

                // comment was created successfully
                if(comment) {
                    // push the comment id into the post's comment array
                    post.comment.push(comment.id);
                    post.save(); // save the post
                }
            });
        }
        // redirect to home
        return res.redirect('/');
    });
}


module.exports.delete = (req, res)=>{

    // find the comment
    Comment.findById(req.params.id,(err,comment)=>{

        // store the post id
        let postId = comment.post;

        // find the post of the comment
        Post.findById(postId,(err,post)=>{

            // store the id of the user who made the comment
            let postUserId = post.user;

            // the comment should be able to be deleted by either the comment owner or the post owner
            if((comment.user == req.user.id) || (postUserId == req.user.id)) {

                // remove the comment
                comment.remove();

                // also update the comment array of the post to remove the current comment
                Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}},(err,post)=>{
                    console.log(post);
                });
            }

        });
        
        // redirect to home page
        return res.redirect('back');
    });

    
}