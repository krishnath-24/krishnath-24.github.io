const router = require('express').Router();
const User = require('../models/User');


router.get('/sign-up',(req, res)=>{
    return res.render('signup');
});


router.get('/sign-in', (req, res)=>{
    return res.render('signin');
});

router.post('/create',(req,res)=>{

    console.log(req.body);

    User.create(req.body,(error,user)=>{
        
        if(error) {
            console.log(error);
        }

        else console.log('user created : ' + user);
    });

    res.redirect('/users/profile');

});

router.post('/create-session',(req, res)=>{
    
    User.find({email : req.body.email},(error, user)=>{
        if(error || user.password !== req.body.password) {
            
            return res.redirect('back');
        }

        return res.redirect('/users/profile');
    });
});

router.get('/profile',(req, res)=>{
    return res.render('profile');
});


router.get('/sign-out',(req, res)=>{
    return res.redirect('/users/sign-in');
});

module.exports = router;
