const mongoose = require('mongoose');

// creating a postSchema 
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    // linking it to a user because specific user post something to know the user we have to link user so this is how we can link but you can explore more in the documentation
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //  refering to user schema database
        ref: 'User'
    }
},
{
    timestamps: true
});

// before exporting we have tell this is going to be model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
// Now we have exported this model now where ever we use it we just import this file  