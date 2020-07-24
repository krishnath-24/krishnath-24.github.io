const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/habit_db');

const db = mongoose.connection;

db.once('open',()=>{
    console.log('MongoDB connected');
});

db.on('error',(error)=>{
    console.log("Error connecting to mongoDB",error);
});

module.exports = db;