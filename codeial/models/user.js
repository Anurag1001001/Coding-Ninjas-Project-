const mongoose = require('mongoose');

// importing multer library we'll be importing or setting up multer to every module where ever i need it although i can centralised it like we were doing since 
const multer = require('multer');
const { use } = require('passport');

// path module is required to set path using path.join and just google it to know more about it
const path = require('path');

const AVATAR_PATH = path.join('./uploads/users/avatars');




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
    },
    avatar: {
        type:String
    }
},{
        // timestamps is true because i want to know when something is created or updated in a database
        timestamps:true
    
});

// diskStorage means we're storing locally


let storage = multer.diskStorage({
    //  destination where our file goes to store
    // file variable me file aayegi and cb callback function hai
    // path.join( __direname , '..', AVATAR_PATH) inn sbhi ko join kra toh overall path models('..' kra hai na toh wo directory name aa gya h) + AVATAR_PATH ye bn gya h and isi path me ja k store hoga file.
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },

    // file.filename : filename refers to avatar(field in the user schema) so whatever file we'll upload their name would be' avatar'(== file.filename) + '-' + Date.now().
    // Date.now() becoz same name ki file v upload hogi toh usse distinguish krne k liye.
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// static methods (static function OOPS concept wala)
// How's going to access these static function Ans- User.uploadedAvatar :
// .single() method represents that user can upload one file at a time they can't upload array of files
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');

//  to make path (where files to be uploaded) available publicaly that't why 
userSchema.statics.avatarPath = AVATAR_PATH;

//  now if want to use these two statics method we would do the same thing as we do in OOPs className.staticMethodName here : User.avatarPath

const User = mongoose.model('User', userSchema);

module.exports = User;