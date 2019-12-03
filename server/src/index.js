import express from 'express';
import router from './server/router/index';
import send from './server/emails/sendEmail';
import cors from 'cors';
const bodyParser = require("body-parser");
import multer from 'multer';
const nodemailer = require('nodemailer');
//var io = require('socket.io')(http);

const funcErrorHandling = require('./server/middleWare/funcErrorHandling');
const PORT = process.env.PORT || 3000;
/*
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: testAccount.user, // generated ethereal user
    //         pass: testAccount.pass // generated ethereal password
    //     }
    // });
    var transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: "asdfqweerrccb@limitlesscircle.com",
            pass: "qwerr@wee"
        }
    });

    let mailOptions = {
        from:'"Fred Foo ?" <foo@blurdybloop.com>', // sender address
        to: 'zololotarenko.2015@gmail.com,kephik2000@gmail.com', // list of receivers
        subject: 'Hello  ✔', // Subject line
        text: 'Hello world ?', // plaintext body
        html: '<b>Hello world ?</b>' // html body
    };

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    // send mail with defined transport object
    /*let info = await transporter.sendMail({
        from: 'SquadhelpLikeOriginal@gmail.com', // sender address
        to: 'zololotarenko.2015@gmail.com,kephik2000@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);20vitality12@gmail.com//'20vitality12@gmail.com','kephik2000@gmail.com'
*///squadhelpservice@gmail.com
//const result =  sendEmail.send();
//send.sendEmail('For confirmation of mail follow the link:','http://192.168.0.111:5000/','Confirm Email','squadhelpservice@gmail.com');//aleksosnova_3@mail.ru'
const app = express();
app.use("/static", express.static(__dirname + "/server/tmp/"));
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(funcErrorHandling);
app.listen(PORT);

//res.redirect('http://192.168.0.111:5000/');