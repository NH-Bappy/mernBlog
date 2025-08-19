const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        min: [5, "at least use 5 character"],
        max: [19, "maximum use 19 character"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: [5, "at least use 5 character"],
        max: [19, "maximum use 19 character"],
    },
    lastLogin :{
        type: Date,
        trim:true
    },
    phoneNumber: {
        type: Number,
        trim: true,
        required: true,
        mix: [11 , "Must be 11 number"]
    },
    permanentAddress: {
        type: String,
        trim: true,
    },
    presentAddress: {
        type: String,
        trim: true,
    },

},{
    timestamps:true,
})

module.exports = mongoose.model('users' , userSchema)
