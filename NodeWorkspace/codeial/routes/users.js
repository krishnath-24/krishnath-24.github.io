const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


router.post('/create',usersController.create);

router.post('/sign-in',usersController.createSession);


router.get('/friends',(req,res)=>{
    return res.send('<h2>Friends here!</h2>');
});

router.use('/post',require('./posts'));

module.exports = router;