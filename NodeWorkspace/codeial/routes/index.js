const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.use('/user',require('./users'));
router.use('/posts',require('./posts'));


router.get('/', homeController.home);

router.get('/home',(req,res)=>{
    return res.redirect('/');
});


module.exports = router;    