const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        // How we're fetching user._id because it's not getting from the home.ejs form only getting content so where did we're getting user._id ?
        // Ans: remember we called a setAuthenticated functon from app.js and this function is defined in config->passport 
        //  we only want user id not all user details that's why user._id kra hai
        user: req.user._id
    }, function(err, post){
        if (err){
            console.log(`Error Occured ${err}`);
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    //  /posts/destroy/id we'll be passing id to the params and here we're using that id.
    Post.findById(req.params.id, function(err, post){
        // we don't want anyone else delete my post or i delete anyone's else post so we need to to give a condition 
        // post.user, refer kr rha h post schema k user filed ko jo ki user ki id rkh rha h
        // ideally humme req.user._id krna tha nut humne req.user.id kra kyuki humme ObjectId ko string me convert krna h and if hum id use krenge toh javascript apne aap ObjectId ko string format me convert kr dega.
        // .id means converting the object id into string.
        if(post.user == req.user.id){
            // remove will delete that particular document(post and associated details)
            post.remove();
            
            //  deleteMany will delete may comment where post == req.params.id(agr post id match krti h to saare comment delete kr dega)
            Comment.deleteMany({post:req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}