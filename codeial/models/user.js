const mongoose = require('mongoose');
// let's define Schema 
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    name:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    }
},{
        // timestamps is true because i want to know when something is created or updated in a database
        timestamps:true
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;