const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const signupController = require('../controllers/sign_up_controller');
const signinController = require('../controllers/sign_in_controller');

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


router.post('/sign-up',usersController.profile);

router.post('/sign-in',usersController.profile);


router.get('/friends',(req,res)=>{
    return res.send('<h2>Friends here!</h2>');
});

router.use('/post',require('./posts'));

module.exports = router;