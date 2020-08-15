const mongoose = require('mongoose');  // require the mongoose

//  connect with the database
mongoose.connect('mongodb://localhost:27017/nodeauth');


//  get the connection instance
const db = mongoose.connection;

// once the db is connected
db.once('open',()=>{
    console.log('db connected');
});


//  if there is some error in connecting the db
db.on('error',(error)=>{
    console.log('error in connecting to db ' +error);
});

// export the db
module.exports = db;