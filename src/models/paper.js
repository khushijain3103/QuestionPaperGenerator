const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperSchema = new Schema({
    subject : {
        type : String,
        required : true
    },

    questions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question'
    }],

    totalMarks : {
        type : Number,
        required : true
    },

    difficulty : {
        easy : {
            type : Number,
        },
        medium : {
            type : Number,
        },
        hard : {
            type : Number
        },

        required : true
    }
});

module.exports = mongoose.model('Paper' , paperSchema);