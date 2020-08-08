const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res) {
    
    Post.find({}).populate('user')
    .populate({
        path : 'comment',
        populate : {
            path : 'user'
        }
    })
    .exec((error,posts)=>{

        User.find({},(error,users)=>{
            return res.render('home',{
                title : 'home',
                posts : posts,
                all_users : users
            });
        });
    });
    
}