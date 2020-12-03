const nodeMailer = require('../../config/nodemailer');

// Now we're going to create a function which will send a mail


// usually we export function like this module.exports = functionName(){}  but this time i'll export function in a different way

// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');
    // ususally people send mails into tabular format so that if size changes table don't get deformed.
    // you can read more about formatting mails from the net
    nodeMailer.transporter.sendMail({
        from: 'nickjohn1003@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("Error in Sending mail", err);
            return;
        }
        console.log("message sent", info);
        return;
    });
}