const mongoose = require('mongoose');
const {Schema} = new mongoose;



const blogSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },
    blogTile: {
        type:String,
        required: true,
        trim: true,
    },
    blogDescription:{
        type:String,
        required:true,
        trim: true,
    },
    image: {
        type: String,
        require: true,
    }
},{
    Timestamp: true,
})


module.exports = mongoose.model('blog' , blogSchema)