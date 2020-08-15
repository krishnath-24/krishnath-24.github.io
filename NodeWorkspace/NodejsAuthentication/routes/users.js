// require the modules
const router = require('express').Router();
const userController = require('../controllers/users_controller');
const passport = require('../config/passport-local-strategy');


//  the sign up route
router.get('/sign-up',passport.checkNotAuthenticated,userController.signUp);


// the sign in route
router.get('/sign-in',passport.checkNotAuthenticated, userController.signIn);


// the route to create the user
router.post('/create',userController.create);

// route to start the session
router.post('/create-session', passport.authenticate('local',{
    failureRedirect : '/users/sign-in'
}) ,userController.createSession);


// route to render the profile of the user
router.get('/profile',passport.checkAuthenticated ,userController.profile);

//  route to log the user out
router.get('/sign-out', userController.logout);

// route to reset the user's password
router.get('/password/reset',passport.checkAuthenticated ,userController.passwordUpdateForm);

//  route to post the form data of the reset password
router.post('/password/reset',userController.resetPassword);

// route to log the user using the google auth
router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));

// route after the user is verified and the oauth redirects to this with the user profile
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/users/sign-in'}), userController.createSession);


// export the router
module.exports = router;
