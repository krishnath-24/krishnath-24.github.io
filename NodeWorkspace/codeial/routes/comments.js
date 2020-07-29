const router = require('express').Router();
const passport = require('passport');

router.post('/:id/create',passport.checkAuthenticated,require('../controllers/comment_controller').create);

module.exports = router;