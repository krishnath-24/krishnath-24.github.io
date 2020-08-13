const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nodeauth');


const db = mongoose.connection;

db.once('open',()=>{
    console.log('db connected');
});


db.on('error',(error)=>{
    console.log('error in connecting to db ' +error);
});


module.exports = db;