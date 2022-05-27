const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qac.cinema@gmail.com',
    pass: 'P@ssword123!'
  }
  })

module.exports = {

  sendEmail: async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    var mailOptions = {
        from: email,
        to: 'qac.cinema@gmail.com',
        subject: subject,
        message: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.status(200).send(`Email sent: ${info.response}`)
        }
  });
}
}