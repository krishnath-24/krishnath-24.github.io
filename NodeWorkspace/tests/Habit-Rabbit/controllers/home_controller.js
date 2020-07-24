// require the data model
const Habit = require('../models/habit');


// action to render the home page
module.exports.home = (req,res)=>{


    // fetch all habits from the db
    Habit.find({},(error,habits)=>{
       if(error) {
           console.log(error);
           return;
       }

       // render the home page and pass the habits array
       return res.render('home',{
           title : 'Habit-Rabit',
           habits : habits
       });
   })
   
}


// action to create the habit
module.exports.createHabit = (req,res)=>{

    // create the habit 
    Habit.create({
        description : req.body.description,
        done : 0,
        streak : 0,
        week : ['None','None','None','None','None','None','None']

    },
    // callback function after habit is created
    (err,habit)=>{
        if(err) {
            console.log('Error in creating the habit.',err);
            return;
        }

        // redirect to the home page
        res.redirect('/');
    });
    
}


// action to delete the habit
module.exports.deleteHabit = (req,res)=>{

    
    // delete the habit by using the id

    Habit.findByIdAndDelete(req.params.id, (error, habit)=>{

        // handle the error when habit was not deleted
        if(error) {
            console.log('error deleting the habit' + error);
            return;
        }

        // habit was deleted and redirect back to home page
        res.redirect('/');
    });
}