// Here I'm writing a steps that we need to do for every project
//step 1: install express server(npm install express) then import it in index.js file 

const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser'); 
const app = express();

const port =8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


// use to read post request
app.use(urlencoded());
// we need to tell that we're going to use cookie-parser
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and script from sub pages and merge them inside head section of layout

// koi property use krni h toh app.use use krte hai and koi property set krni hai toh app.set property use krte hai 

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views','./views');

// used middleware to encrypt session cookie
app.use(session({
    name:'codial',
    // TODO Change the secret before deployment in production mode
    secret:'blahsomething',
    // do i need to store session data when user is not initailize ? No right ? that's why i did saveUninitialize : false bcoz i don't want to store any session data if user is not logged in  
    saveUninitialized: false,
    //  if user is once logged in do i need to rewrite(resave) session data again and again whenever user visit their profile page again and again ? No that's why i did resave: false
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// importing main file of routing module(index.js)
// Basically this is a routes file whenever any request comes express refer to routes file and there would be full filled client task
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        // this is the new way of writing, it is known as Interpolation way 
        console.log(`Error in setting up a server: ${err}`);
    }
    console.log(`Successfully set up the express server:${port}`);
})



