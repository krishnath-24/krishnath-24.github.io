const router = require('express').Router();
const passport = require('passport');
const commentController = require('../controllers/comment_controller');

router.post('/create/:id',passport.checkAuthenticated,commentController.create);

router.get('/delete/:id', passport.checkAuthenticated ,commentController.delete);

module.exports = router;