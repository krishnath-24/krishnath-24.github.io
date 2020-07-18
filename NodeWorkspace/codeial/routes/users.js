const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const signupController = require('../controllers/sign_up_controller');
const signinController = require('../controllers/sign_in_controller');

router.get('/sign-up',signupController.signup);

router.post('/signup',function(req, res){
    res.send("Successfully signed up!");
});


router.get('/sign-in',signinController.signin);

router.post('/sign-in',usersController.profile);

router.get('/profile',usersController.profile);



router.get('/friends',(req,res)=>{
    return res.send('<h2>Friends here!</h2>');
});
router.use('/post',require('./posts'));

module.exports = router;