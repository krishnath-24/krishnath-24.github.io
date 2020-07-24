const express =  require('express');
const app = express();
const port = process.env.port || 3000;
const db = require('./config/mongoose');
const Habit = require('./models/habit');
const bodyParser = require('body-parser');
app.set('view engine','ejs');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{

    Habit.find({},(error,habits)=>{
        if(error) {
            console.log(error);
            return;
        }

        // console.log('got them habits' + habits);

        return res.render('layouts/home',{
            title : 'Home Page',
            habits : habits
        });
    })
    
});

app.post('/create-habit',(req,res)=>{
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
        console.log('habit saved.',habit);
        res.redirect('/');
    });
    
});


app.get('/view-weekly',(req,res)=>{
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

app.get('/delete-habit:id', (req,res)=>{
    console.log('id : '+ req.params.id);
     Habit.findOneAndDelete(req.params.id, (error)=>{
        if(error) {
            console.log('error deleting the habit' + error);
            return;
        }
         
        res.redirect('/');
    })
});

app.get('/update/:id/:weekday/:status',async (req,res)=>{
    
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
})


app.listen(port,(error)=>{

    if(error) {
        console.log(error);
        return;
    }

    console.log(`Server running on port ${port}`);
});