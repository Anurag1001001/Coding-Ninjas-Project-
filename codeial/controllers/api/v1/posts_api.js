const Post = require('../../../models/post');
const Comment  = require('../../../models/comment');


module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            // here we're passing the comments and user FIELD jo ki post.js(models) Schema me defined hai
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        return res.json(200,{
            message: 'list of posts',
            posts: posts
        });
}


module.exports.destroy = async function(req,res){
    try{
        //  /posts/destroy/id we'll be passing id to the params and here we're using that id.
    
    // NEW COMMENT REGARDED TO ASYNC AWAIT
    // see the callback function of Post.findBNyId() there is a post variable and if error occured error msg goes to err variable and if no  error occurrs then result goes to 2nd variable. Now we're using async await and removing callback function so if error occurs then it goes to catch part and if don't then it return and stored result to post variable(let post).  

    let post = await Post.findById(req.params.id);
    // we don't want anyone else delete my post or i delete anyone's else post so we need to to give a condition 
    // post.user, refer kr rha h post schema k user filed ko jo ki user ki id rkh rha h
    // ideally humme req.user._id krna tha nut humne req.user.id kra kyuki humme ObjectId ko string me convert krna h and if hum id use krenge toh javascript apne aap ObjectId ko string format me convert kr dega.
    // .id means converting the object id into string.

    if(post.user == req.user.id){
        // remove will delete that particular document(post and associated details)
        post.remove();
        
        //  deleteMany will delete may comment where post == req.params.id(agr post id match krti h to saare comment delete kr dega)
        await Comment.deleteMany({post:req.params.id});

        

        // displaying flash message
        // req.flash('success', 'post deleted successfully');
        return res.json(200,{
            message: "Post and associated deleted successfully!"
        });

    }
    else{
        return res.json(401,{
            message: "you can not delete this post"
        });
    }
}
    catch(err){
        return res.json(500,{
            message: "Internal Server error"
        });
    }
    
}