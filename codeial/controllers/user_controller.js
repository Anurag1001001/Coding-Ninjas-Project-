const User = require('../models/user');
const passport = require('../config/passport-local-strategy');
// sakshi.singh@jabraconnect.com
module.exports.signin = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/user/welcome');
    }
    else{
        res.render('signin',{
            title:"signin"
        });
}
};

module.exports.signup = function(req , res){
    if (req.isAuthenticated()){
        return res.redirect('/user/welcome');
    }
    else{
        res.render('signup',{
            title:"signup"
        });
    }
}

// get the sign up data
module.exports.create = function(req, res){
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
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

// logout function
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'logged out successfully');
    return res.redirect('/');
}


module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user: user
        });
    });
    
}

// updating the name and email of sign in user
module.exports.update = function(req, res){
    //  giving condition so that no one can fiddle with my system only logged in user can update their information
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body, function(err, user){
            return res.redirect('back');
        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}