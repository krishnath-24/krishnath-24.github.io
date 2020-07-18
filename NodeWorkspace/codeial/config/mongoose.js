const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial_development');

const db = mongoose.connection;

db.on('erro',console.error.bind(console,'Error connecting to mongo'));

db.once('open',function(){
    console.log('mongo db connected');
});

module.exports = db;