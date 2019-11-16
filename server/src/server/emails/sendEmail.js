const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'squadhelpservice@gmail.com',
        pass: 'ServiceecivreS'
    }
});
const createHtml = (href, title) => {
    const anchor = (href.length > 40) ? href.slice(0, 40) + '...' : href;
    return '<table style="box-sizing:border-box;font-family:Raleway,sans-serif;background:#e9e9e9;padding:10px;text-align:center;">' +
        '<caption style="box-sizing:border-box;font-size:36px;color:#28d2d0;font-weight:600;background:#e9e9e9;">Squadhelp</caption>' +
        '<tbody><td><span style="font-size:24px;color:black;font-weight:600;margin-bottom:10px;">' + title + '</span></td></tr>' +
        '<tr><td><a href="' + href + '" style="color:white;font-weight:500;text-align:center;background:#28d2d0;text-decoration:none;cursor:pointer;' +
        'font-size:18px;margin-bottom:10px;padding:3px;">' + anchor + '</a></td></tr>' +
        '<tr><td><span style="font-size:20px;color:black;font-weight:400;">Thank you for choosing us</span></td></tr></</tbody>' +
        '</table>'
};

module.exports.sendEmail = async (htmlTitle, confirmApi, subject, to) => {

    try {

        const mailOptions = {
            from: 'squadhelpservice@gmail.com',
            to,  //to: 'squadhelpservice@gmail.com',
            subject,
            html: createHtml(confirmApi, htmlTitle),
        };
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err);
            else
                console.log(info);
        });
    } catch (e) {

    }

};