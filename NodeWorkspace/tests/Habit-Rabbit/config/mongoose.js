// require mongoose
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost:27017/habit_db');


// get connection status
const db = mongoose.connection;


// status message when db is successfully connected
db.once('open',()=>{
    console.log('MongoDB connected');
});


// failed to connect to db
db.on('error',(error)=>{
    console.log("Error connecting to mongoDB",error);
});


// export the connection instance
module.exports = db;