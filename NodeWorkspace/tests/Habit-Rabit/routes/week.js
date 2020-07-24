const router = require('express').Router();
const Habit = require('../models/habit');

router.get('/view-weekly',(req,res)=>{
    Habit.find({},(error, habits)=>{
        if(error) {
            console.log('error' + error);
            return;
        }
        return res.render('layouts/week_view',{
            title : 'view weekly',
            habits : habits
        });
    });
    
});



router.get('/change-status/:id/:weekday/:status',async (req,res)=>{
    
    try{

        console.log(req.params.status);
        
        let habit = await Habit.findById(req.params.id);
        habit.week[req.params.weekday] = req.params.status;
        await Habit.findByIdAndUpdate(req.params.id,{week : habit.week});

        let done = 0, maxStreak = 0, streakTillNow = 0;

        for(let i of habit.week) {

            if(i === 'Done'){done++; streakTillNow++; } 

            else {
                maxStreak = Math.max(maxStreak,streakTillNow);
                streakTillNow = 0;
            }

        }

        maxStreak = Math.max(maxStreak,streakTillNow);

        habit.done = done;
        habit.streak = maxStreak;

        await Habit.findByIdAndUpdate(req.params.id,{done : habit.done, streak : habit.streak});

        res.redirect('back');
    }    
    catch(error) {
        console.log(error);
        return; 
    }
});

module.exports = router;
