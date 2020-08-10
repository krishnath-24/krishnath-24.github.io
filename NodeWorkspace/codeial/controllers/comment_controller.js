// require the comment model
const Comment = require('../models/comment');

// require the post model
const Post = require('../models/post');


// define the create comment action
module.exports.create = async (req, res)=>{

    try {
        // fetch id of post on which the comment is made
        let postId = req.params.id;

        // find the post
        let post = await Post.findById(postId);

        if(post) { // if the post is found

            // create the comment
            let comment = await Comment.create({
                content : req.body.content,
                user : req.user.id,
                post : postId
            });

            // comment was created successfully
            if(comment) {
                // push the comment id into the post's comment array
                post.comment.push(comment.id);
                post.save(); // save the post
                req.flash('success','Comment created successfuly.');
            }
        }
        // redirect to home
        return res.redirect('/');

    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }

}



// action to delete the comment
module.exports.delete = async (req, res)=>{

    try {
            // find the comment
        let comment = await Comment.findById(req.params.id);

        // store the post id
        let postId = comment.post;

        // find the post of the comment
        let post = await Post.findById(postId);

        if(post) {

            // store the id of the user who made the comment
            let postUserId = post.user;

            // the comment should be able to be deleted by either the comment owner or the post owner
            if((comment.user == req.user.id) || (postUserId == req.user.id)) {

                // remove the comment
                comment.remove();

                // also update the comment array of the post to remove the current comment
                await Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}});
            }
        }
        
        req.flash('success','Comment removed successfuly');
        // redirect to home page
        return res.redirect('back');
        
    } catch (error) {

        req.flash('error',error);
        res.redirect('back');
    }
}