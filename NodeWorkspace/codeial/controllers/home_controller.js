const post = require('../models/post');
const Post = require('../models/post');

module.exports.home = function(req,res) {
    
    Post.find({}).populate('user')
    .populate({
        path : 'comment',
        populate : {
            path : 'user'
        }
    })
    .exec((error,posts)=>{

        return res.render('home',{
            title : 'home',
            posts : posts
        });
    });
    
}