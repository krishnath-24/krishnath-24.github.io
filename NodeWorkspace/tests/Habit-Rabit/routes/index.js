const express = require('express');
const Habit = require('../models/habit');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.use('/',require('./week'));


router.get('/',homeController.home);

router.post('/create-habit',homeController.createHabit);

router.get('/delete-habit/:id', (req,res)=>{

    console.log(req.params.id);

    Habit.findByIdAndDelete(req.params.id, (error, habit)=>{
        if(error) {
            console.log('error deleting the habit' + error);
            return;
        }
        res.redirect('/');
    });
});



module.exports = router;