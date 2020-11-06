const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_development');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to database'));
db.once('open', function(){
    console.log('database connected');
});

module.exports = db;