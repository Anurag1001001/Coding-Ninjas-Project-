const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// go through nodemailer official documentation.
// medium post dekhna h   

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: ' smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'nickjohn1003@gmail.com',
        pass: 'Nickjohn@123'
    }
});

//  template config

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        // given path will carry all my ejs Template
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering Template'); return;}

            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};