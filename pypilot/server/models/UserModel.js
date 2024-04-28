const mongoose = require('mongoose');
const User = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    isverified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number
    },
    total_answered:{
        type : Number,
        default: 0
    },
    correctly_answered: {
        type : Number,
        default: 0
    },
    exp_level :{
        type: String,
        enum : ['beginner','intermediate',"advanced"]
    },
    Questions : {
        type : Array,
        default : []
    }
})
module.exports = mongoose.model("User", User);
