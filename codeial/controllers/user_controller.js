const User = require('../models/user');
// sakshi.singh@jabraconnect.com
module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                // console.log(user);
                return res.render('profile',{
                    title:'profile',
                    user: user
                });
            }
            return res.redirect('/user/signin');
        });
    }else{
    return res.redirect('back');
}
};

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
    // steps to authenticate
    // find the user

    User.findOne({email:req.body.email}, function(err, user){
        if (err){console.log('Error in finding user in signing in', err);return;}
        if (user){

            // handle password which doesn't match
            if (user.password != req.body.password){
                console.log(User.password);
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
            console.log('hi')
        }
        else{
        //    let's suppose we don't use else statement here and put return statement outside the else part then this we throw an error because we can't put two return statement in a function because javascript runs asynchronously while if block is being executed by the javascript asynchronouly the return statement will get executed and then fir inside if block k return statement will get executed toh 2 return statement execute ho rha hai, toh iss tarah k case me if and else statement k andar return statement use krni chahiye taki ek hi bar return statement execute ho...... and 2nd way ye hai ki async wait use kr le.....

            // handle user not found
            return res.redirect('back');
        }
    })
}

// Sign out functionality

module.exports.signout = function(req,res){
    res.cookie('user_id', '');
    return res.redirect('/user/signin');
}


module.exports.app = function(req,res){
    return res.send("Hey I'm Anurag Tripathi");
}