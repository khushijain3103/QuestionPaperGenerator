const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question : {
        type : String,
        required : true
    },

    subject : {
        type : String,
        required : true
    },

    topic : {
        type : String,
        required : true
    },

    difficulty : {
        type : String,
        required : true
    },

    marks : {
        type : Number,
        required : true
    },
});

module.exports = mongoose.model('Question', questionSchema);