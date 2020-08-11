const Post = require('../models/post');
const User = require('../models/user');


// create the home action
module.exports.home = async function(req,res) {
    
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comment',
            populate : {
                path : 'user'
            }
        });

        let users = await User.find({});

        return res.render('home',{
            title : 'home',
            posts : posts,
            all_users : users
        });
        
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
    
}