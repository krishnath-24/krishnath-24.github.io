const router = require('express').Router();
const User = require('../models/User');
const userController = require('../controllers/users_controller');

router.get('/sign-up',userController.signUp);

router.get('/sign-in', userController.signIn);

router.post('/create',userController.create);

router.post('/create-session',userController.createSession);

router.get('/profile',userController.profile);


router.get('/sign-out', userController.logout);

module.exports = router;
