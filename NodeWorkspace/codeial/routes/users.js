const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.get('/profile',usersController.profile);


router.post('/create',usersController.create);

router.post('/create-session',passport.checkAuthenticated,usersController.createSession);


router.use('/post',require('./posts'));
module.exports = router;