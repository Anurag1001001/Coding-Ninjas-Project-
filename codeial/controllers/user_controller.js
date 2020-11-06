const User = require('../models/user');
// sakshi.singh@jabraconnect.com
module.exports.signin = function(req, res){
    res.render('signin',{
        title:"signin"
    });
};

module.exports.signup = function(req , res){
    res.render('signup',{
        title:"signup"
    });
}

// get the sign up data
module.exports.create =function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if (err){console.log('error in finding user in signing up'); return;}
        if (!user){
            User.create(req.body, function(err, user){
                if (err){console.log('error in creating user while signing up'); return;}
                return res.redirect('/user/signin');
            });
        }
        else{
            return res.redirect('back');
        }
    });
        
    }
// create a sign-in session for the user
module.exports.createSession = function(req, res){
    //to do
}



module.exports.app = function(req,res){
    return res.send("Hey I'm Anurag Tripathi");
}