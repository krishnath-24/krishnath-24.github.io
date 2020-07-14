// require mongoose
const mongoose = require("mongoose");

// make a connection
mongoose.connect("mongodb://localhost:27017/contact_list_db");


// get connection instance
const db = mongoose.connection;

// check for any error
db.on("error",console.error.bind(console, "Error connecting to db"));

// db connection successful
db.once("open",()=> {
    console.log("Db successfuly connected");
});

module.exports = db;