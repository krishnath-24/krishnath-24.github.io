const router = require('express').Router();
const userController = require('../controllers/users_controller');
const passport = require('../config/passport-local-strategy');

router.get('/sign-up',passport.checkNotAuthenticated,userController.signUp);

router.get('/sign-in',passport.checkNotAuthenticated, userController.signIn);

router.post('/create',userController.create);

router.post('/create-session', passport.authenticate('local',{
    failureRedirect : '/users/sign-in'
}) ,userController.createSession);

router.get('/profile',passport.checkAuthenticated ,userController.profile);

router.get('/sign-out', userController.logout);

router.get('/password/reset',passport.checkAuthenticated ,userController.passwordUpdateForm);

router.post('/password/reset',userController.resetPassword);

module.exports = router;
