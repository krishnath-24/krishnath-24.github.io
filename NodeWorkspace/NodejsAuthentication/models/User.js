const mongoose = require('mongoose');

//  define the user Schema
const UserSchema = mongoose.Schema({

    name : {
        type : String,
    },

    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
    }
},
    {timestamps : true}
);

// create the schema
const User = mongoose.model("User",UserSchema);

// export the user model
module.exports = User;