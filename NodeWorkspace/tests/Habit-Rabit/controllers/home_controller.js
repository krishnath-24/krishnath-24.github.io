const Habit = require('../models/habit');


module.exports.home = (req,res)=>{


    Habit.find({},(error,habits)=>{
       if(error) {
           console.log(error);
           return;
       }

       return res.render('layouts/home',{
           title : 'Home Page',
           habits : habits
       });
   })
   
}

module.exports.createHabit = (req,res)=>{
    console.log(req.body);
    Habit.create({
        description : req.body.description,
        done : 0,
        streak : 0,
        week : ['None','None','None','None','None','None','None']
    },(err,habit)=>{
        if(err) {
            console.log('Error in creating the habit.',err);
            return;
        }
        res.redirect('/');
    });
    
}