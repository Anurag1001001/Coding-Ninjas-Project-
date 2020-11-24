const passport = require('passport');
const User = require('../models/user');


// we also need to import the strategy
const LocalStrategy = require('passport-local').Strategy;

// we need to tell passport aboout whatever strategy we have used

// authentication using passsport
passport.use(new LocalStrategy({
    // this is what we are going to keep unique(email) in schema 
    usernameField: 'email',
    passReqToCallback: true
},
    // Callback function this function takes 3 parameter
    function(req,email,password, done){
        // find the user and establish the identity
        //  here what we are doing is we are find the user whose email and password in mentioned as a parameter

        // don't get confused email: email, the key email is the property we are looking at and the value email is the email that we're getting from the above function
        User.findOne({email:email}, function(err, user){
            if (err){
                // showing a flash message
                req.flash('error', err);
                //  done takes two argument  the first one is error and the 2nd one is : check on google.
                //  we can go with passing one argument and javascript don't throw any error
                return done(err);
            }
            
            // If the user not found or password doesn't match then run this if statement
            if (!user || user.password != password){
                // displaying flash message
                req.flash('error',' Invalid Username/ Password');

                // 2nd argument of done is false means that authentication has not been done so authentication is false
                return done(null, false);
            }
            // If the user found we'll return user
            return done(null, user);
        });
    }
));

//  Serializing the user to decide which key  is to kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding the user");
            return done(err);
        }
        return done(null, user);
    });
});


// check if the user is authenticated
//  this is a middleware see the parameters
passport.checkAuthentication = function(req,res, next){
    // isAuthenticated a passport function used to check whether a user authenticated or not
    if(req.isAuthenticated()){
        return next()
    }
    // if the user is not signed in
    return res.redirect('/user/signin');
}; 

//  this middleware sets the users for the views

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the signed in user from the session cookie and we're just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;