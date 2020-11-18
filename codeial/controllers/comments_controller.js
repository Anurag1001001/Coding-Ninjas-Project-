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

                res.redirect('back');
            });
        }
    });
}