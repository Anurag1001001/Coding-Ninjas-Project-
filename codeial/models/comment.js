const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    //  Storing user comments
    content: {
        type: String,
        required: true
    },
    // comment belongs to  a user
    // storing user id to know which user commented on a post
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // storing post id so that we get to know at which post user commented 
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps:true
});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;