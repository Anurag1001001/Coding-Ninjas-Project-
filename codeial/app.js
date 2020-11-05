// Here I'm writing a steps that we need to do for every project
//step 1: install express server(npm install express) then import it in index.js file 

const express = require('express');
const app = express();
const port =8000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static('./assets'));

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



