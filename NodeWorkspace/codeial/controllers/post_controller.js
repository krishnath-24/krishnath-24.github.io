const Post = require('../models/post');
const Comment = require('../models/comment');

// action to create a post
module.exports.createPost = async (req, res)=> {
    
    try {

        // create the post
        const post = await Post.create({
            // pass the post data from the request body
            content : req.body.content,
            user : req.user.id
        });
    
        // if post was created then redirect to home
        if(post) return res.redirect('/');
        
    } catch (error) {
        // if error then redirect back
        console.log(error);
        return res.redirect('back');
    }
}


// action to delete a post
module.exports.destroy = async (req, res) => {

    try {

        // find the post using the id and store in post
        let post = await Post.findById(req.params.id);

        if(post) { // if the post was found

            // if the post's user matches the current logged in user
            if(post.user == req.user.id) { 

                // remove the post
                post.remove();

                // delete all the comments associated with the post
                await Comment.deleteMany({post : req.params.id});
            }

            res.redirect('back');
        };

    } catch (error) {
        // log the error
        console.log(error);
        // redirect back
        res.redirect('back');
    }
}