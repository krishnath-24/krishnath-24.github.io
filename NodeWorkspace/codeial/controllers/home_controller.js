const Post = require('../models/post');
const User = require('../models/user');

// define the home action
module.exports.home = async function(req,res) {
    
    try {
        // find all the posts
        let posts = await Post.find({}).populate('user');
        post.populate({
            path : 'comment',
            populate : {
                path : 'user'
            }
        });

        // find all the users
        let users = await User.find({});

        // render the home page
        return res.render('home',{
            title : 'home',
            posts : posts,
            all_users : users
        });

        
    } catch (error) { // if an error occurs
        
        console.log(error);
        return res.redirect('back'); // redirect back
    }
}