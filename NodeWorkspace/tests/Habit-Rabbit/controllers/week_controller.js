// require the habit model
const Habit = require('../models/habit');


// action to view the week page
module.exports.view = (req,res)=>{

    // fetch all the habits from the db
    Habit.find({},(error, habits)=>{
        if(error) {
            console.log('error' + error);
            return;
        }

        // render the week page
        return res.render('week_view',{
            title : 'view weekly',
            habits : habits
        });
    });
    
}


// action to change the status of the habit on a certain day
module.exports.changeStatus = async (req,res)=>{
    
    try{

        // fetch the habit with id from the db
        let habit = await Habit.findById(req.params.id);

        // change the status for that week of that habit
        habit.week[req.params.weekday] = req.params.status;

        // update the week array in the db
        await Habit.findByIdAndUpdate(req.params.id,{week : habit.week});


        // logic to recompute the streak and total days done 
        let done = 0, maxStreak = 0, streakTillNow = 0;
        for(let i of habit.week) {

            if(i === 'Done'){done++; streakTillNow++; } 
            else {
                maxStreak = Math.max(maxStreak,streakTillNow);
                streakTillNow = 0;
            }
        }

        // update the maxStreak
        maxStreak = Math.max(maxStreak,streakTillNow);

        // update the habit's fields
        habit.done = done;
        habit.streak = maxStreak;

        // update the done count and streak count in the db
        await Habit.findByIdAndUpdate(req.params.id,{done : habit.done, streak : habit.streak});
        res.redirect('back');
    }    
    catch(error) {

        // handle the error if it occurs
        console.log('error in changing the status of the habit',error);
        res.redirect('/');
    }
}