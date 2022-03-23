var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stevennodemailer@gmail.com',
        pass: 'bk1668jn'
    }
});

var mailOptions = {
    from: 'stevennodemailer@gmail.com',
    to: 'stevenyang9595@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});