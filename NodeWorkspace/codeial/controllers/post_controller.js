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



        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post,
                },
                message : 'post created.'
            });
        }
     
        // if post was created then redirect to home
        if(post){
            req.flash('success','Post created.');
             return res.redirect('/');
        }
        
    } catch (error) {
        // if error then redirect back
        req.flash('error',error);
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

                if(req.xhr) {
                    console.log('xhr delete req');
                    return res.status(200).json({
                        data : {
                            post_id : req.params.id
                        },
                        message : 'Post Deleted'
                    });
                }
            }

            req.flash('success','Post and its comments deleted.');
            res.redirect('back');
        };

    } catch (error) {
        // log the error
        req.flash('error',error);
        // redirect back
        res.redirect('back');
    }
}