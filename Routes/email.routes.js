const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const Email = require("../models/email");
const jobScheduler = require('../helpers/emailsender');
const sendemail = require('../controllers/sendemails')
require("dotenv").config();
router.get("/email", async (req, res, next) => {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: "mnsagacious@gmail.com",
        pass: "akhpznhsakwyhont",
      },
    };

    let transport = nodemailer.createTransport(config);
    let mailGen = new mailgen({
      theme: "default",
      product: {
        name: "mailgen",
        link: "www.sagacious.pk",
      },
    });
    let response = {
      body: {
        name: "Daily Tuition",
        intro: "Your bill has arrived!",
        table: {
          data: [
            {
              item: "Nodemailer Stack Book",
              description: "A Backend application",
              price: "$10.99",
            },
          ],
        },
        outro: "Looking forward to do more business",
      },
    };
    let mail = mailGen.generate(response);
    let message = {
      from: "mnsagacious@gmail.com",
      to: "hassanali012233@gmail.com",
      subject: "Place Order",
      html: mail,
    };

    // let info = await transport.sendMail({
    //     from: `<${process.env.email}>`, // sender address
    //     to: "hassan.ali@sagacious.systems, danial.khalid@sagacious.systems", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    //   });
    await transport.sendMail(message);
    return res.status(201).json({
      msg: "you should receive an email",
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/email", async (req, res, next) => {
  try {
    const { emailbody } = req.body;
    const email = new Email({
      message: emailbody,
    });
    let config = {
      service: "SMTP",
      host: "mail.sagacious.systems",
      port: 587,
      auth: {
        user: "muhammad.noman@sagacious.systems",
        pass: "N0m@n#8080",
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    // const transport = nodemailer.createTransport("SMTP", {
    //   service:'SMTP',
    //   host: "mail.sagacious.systems",
    //   // secureConnection: false, // TLS requires secureConnection to be false
    //   // port: 587, // port for secure SMTP
    //   auth: {
    //     user: "muhammadnoman@outlook.com",
    //     pass: "N0m@n#8080",
    //   },
    //   tls: {
    //     ciphers: "SSLv3",
    //   },
    // });
    const transport = nodemailer.createTransport(config);
    let mailGen = new mailgen({
      theme: "default",
      product: {
        name: "mailgen",
        link: "www.sagacious.pk",
      },
    });
    let response = {
      body: {
        name: "Sagacious Systems",
        intro: "Your bill has arrived!",
        table: {
          data: [
            {
              item: "Nodemailer Stack Book",
              description: "A Backend application",
              price: "$10.99",
              Message: emailbody,
            },
          ],
        },
        outro: "Looking forward to do more business",
      },
    };
 var mailist =["raheel@sagacious.systems","hassan.ali@sagacious.systems","daniyal.khalid@sagacious.systems"]
    let mail = mailGen.generate(response);
    let messages = {
      from: "muhammad.noman@sagacious.systems",
      to: mailist,
      subject: "Place Order",
      html: mail,
    };
    await transport
      .sendMail(messages)
      .then((msg) => {
        console.log(msg);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    const message = await email.save();
    return res.status(200).json({
      message: "success",
      response: message,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
});

router.get('/sendemail',sendemail);

module.exports = router;
