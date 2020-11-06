// Here I'm writing a steps that we need to do for every project
//step 1: install express server(npm install express) then import it in index.js file 

const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser'); 
const app = express();

const port =8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
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




// importing main file of routing module(index.js)
// Basically this is a routes file whenever any request comes express refer to routes file and there would be full filled client task
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err){
    if (err){
        // this is the new way of writing, it is known as Interpolation way 
        console.log(`Error in setting up a server: ${err}`);
    }
    console.log(`Successfully set up the express server:${port}`);
})



