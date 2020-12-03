const nodeMailer = require('../../config/nodemailer');

// Now we're going to create a function which will send a mail


// usually we export function like this module.exports = functionName(){}  but this time i'll export function in a different way

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer');
    // console.log(comment.user.email);

    nodeMailer.transporter.sendMail({
        from: 'nickjohn1003@gmail.com',
        to: 'comment.user.email',
        subject: "New Comment Published!",
        html: '<h1>Yup, your comment is now published !</h1>'
    }, (err, info) => {
        if(err){
            console.log("Error in Sending mail", err);
            return;
        }
        console.log("message sent", info);
        return;
    });
}