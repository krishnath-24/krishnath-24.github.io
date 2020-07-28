const passport = require('passport');
const express = require('express');
const router = express.Router();


const postController = require('../controllers/post_controller');

router.post('/create-post',passport.checkAuthenticated,postController.createPost);


module.exports = router;