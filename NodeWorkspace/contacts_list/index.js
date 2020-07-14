const express = require('express');
const port = 8000;
const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();
const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

var contacts =[];

app.get('/',(req,res)=>{
    
    return res.render('home',{title : 'Home'});

});

app.get('/contacts',(req,res)=> {

    Contact.find({},(error, data)=>{

        if(error) {
            console.log(error);
            return;
        }
    
        return res.render('contacts',{
            contacts : data,
            title : 'Contacts List'
        });

    });

    
})

app.post('/create-contact',(req,res)=>{

    Contact.create(req.body,function(error, newContact){
        if(error) {
            console.log("error",error);
            return;
        }

        return res.redirect("back");
    })
    
});

app.get('/delete-contact:id',(req,res)=>{

    Contact.findOneAndDelete({_id : req.params.id},(error, newContacts)=>{
    });
    
    res.redirect("/contacts");
});

app.listen(port,()=>{
    console.log("Server is running on port : ",port);
});