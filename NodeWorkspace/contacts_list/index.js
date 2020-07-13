const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

var contacts = [
    {
        name : 'Anuj',
        phone : '8171874416'
    },
    {
        name: 'Slim',
        phone : '92847291821'
    }
]

app.get('/',(req,res)=>{
    
    return res.render('home',{title : 'Home'});

});

app.get('/contacts',(req,res)=> {

    return res.render('contacts',{
        contacts : contacts,
        title : 'Contacts List'
    });
})

app.post('/create-contact',(req,res)=>{
    
    contacts.push(req.body);
    return res.redirect('back');
});

app.get('/delete-contact:phone',(req,res)=>{

    contacts = contacts.filter((contact)=> contact.phone !== req.params.phone);
    res.redirect('back');
});

app.listen(port,()=>{
    console.log("Server is running on port : ",port);
});