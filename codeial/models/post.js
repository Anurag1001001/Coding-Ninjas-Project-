// here we'll establish a relationship b/w databases or you can says b/w Collections

const mongoose = require('mongoose');

// creating a postSchema 
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
        // required: true  means that without this field we're unable to store infomation.
    },
    
    user: {
        // linking it to a user because specific user post something to know the user we have to link user so this is how we can link but you can explore more in the documentation.
        
         // this type is a refering to the User collection because every post should be uniqely created by the User so this should contain unique user Objecid (that's why it is refering to objectId) to whom objectid it will store this will be indicated by ref: Collection Name.
        type: mongoose.Schema.Types.ObjectId,
        //  refering to User schema database
        // this is important step here we're establishing relationship b/w two different schemas(like one-to-one, one-to-many, many-to one kind of relationship).
        ref: 'User'
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    timestamps: true
});

// before exporting we have tell this is going to be model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
// Now we have exported this model now where ever we use it we just import this file  