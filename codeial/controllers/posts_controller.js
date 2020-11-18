const Post = require('../models/post');

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