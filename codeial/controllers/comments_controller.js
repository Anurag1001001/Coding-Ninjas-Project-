const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    // look at the home.ejs file there while submitting the comment we were also sending post id (name = post) req.body.post gives the value of post._id
    Post.findById(req.body.post, function(err, post){
        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id    
            }, function(err, comment){
                if (err){
                    console.log('Error while creating comment');
                }
                // (post.comments.push) post is the same post which we've written in above if statement(if(post)) and this post we fetched from db using a post id and if no error occured then this post info will be sent to post(small p) in callback function.
                
                //  (post.comments.push(comment)) comment is the same which we got from callback function(while creating a comment) if no error will occur.
                post.comments.push(comment);
                // whenever we update somthing in a database then we need to save that changes 
                post.save();
                
                // displaying flash message
                req.flash('success', 'Comment Added');

                res.redirect('back');
            });
        }
    });
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            // if condition matches then we'll delete the comment but before deleting the comment we need to store post id in a variable otherwise we wont be able to delete he comment id from post schema.
            let postId = comment.post;
            comment.remove();
            
            //  What we are actually doing here is just updating post schemas by deleting the comment id from the array of comments of post schema(you can say particular document).
            //we're passing postId  and a query in which we are pulling(pull mongodb ka term h) if comments == req.params.id ho jata hai toh wo saare comment id ko hta dega  
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            
            // adding flash message
            req.flash('success', 'Comment deleted successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', "you can't delete this post");
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        console.log('Error:', err);
        return
    }
    
}