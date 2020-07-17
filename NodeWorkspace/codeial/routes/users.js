const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
router.get('/profile',usersController.profile);
router.get('/friends',(req,res)=>{
    return res.send('<h2>Friends here!</h2>');
});
router.use('/post',require('./posts'));

module.exports = router;