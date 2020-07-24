const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({

    description : {
        type : String,
        required : true,
    
    },
    week : [],
    done : Number,
    streak : Number
});

const habit  = new mongoose.model('habit',habitSchema);

module.exports = habit;