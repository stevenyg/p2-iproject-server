var nodemailer = require('nodemailer');

const sendAutoMailer = (emailReceiver, subject, text) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stevennodemailer@gmail.com',
            pass: 'bk1668jn'
        }
    });

    var mailOptions = {
        from: 'stevennodemailer@gmail.com',
        to: emailReceiver,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendAutoMailer }

