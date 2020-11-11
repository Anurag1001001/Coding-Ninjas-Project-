const { populate } = require('../models/post');
const Post = require('../models/post');


module.exports.home = function(req,res){
    // {} --> this query will fetch all the Post stored in the database
    // what i'm doing here is just fetching all post using the query this --> {}, and putting it into posts variable and as we know this function is public this variable is accessible to all files. This variable is used in home.ejs.

    //  Uncomment this .

    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: 'Codial | home',
    //         posts: posts
    //     });

    // });

    //  A litle change in the above function just uncomment it and compare both, What i'm doing here is populating the "user" into posts variable and then in home.ejs we'll print to the screen which post is posted by whom user. What is '"user"'(passed in populate function ), this is the same user which store user_id in postSchema(there is a field of user) and now with the help of user id we're fetching user's all details and populate it into posts variable.
    
    Post.find({}).populate('user').exec(function(err, posts){         
        return res.render('home',{
            title: 'Codial | home',
            posts: posts
        });
    });

}