const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },
    blogTitle: {
        type: String,
        required: true,
        trim: true,
    },
    blogDescription: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);