// require the mongoose module
const mongoose = require('mongoose');


// create the habit schema
const habitSchema = new mongoose.Schema({

    description : {
        type : String,
        required : true,
    
    },
    week : [],
    done : Number,
    streak : Number
});

// create the model
const habit  = new mongoose.model('habit',habitSchema);


// export the model
module.exports = habit;