const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial_development',{useNewUrlParser:true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open',function(){
    console.log('mongo db connected');
});

module.exports = db;