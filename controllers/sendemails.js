const jobdchedule = require("../helpers/emailsender");
const mailgen = require("mailgen");
const nodemailer = require("nodemailer");
const sendemail = async (req,res) => {
  try {
    jobdchedule(
      "* * * * *",
      async () => {
        try {
          console.log("job is schedule");
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
                
                  },
                ],
              },
              outro: "Looking forward to do more business",
            },
          };
          var mailist = [
            // "raheel@sagacious.systems",
            "hassan.ali@sagacious.systems",
            "daniyal.khalid@sagacious.systems",
          ];
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
        } catch (error) {
          console.log(error);
        }
      },
      null,
      true,
      process.env.TZ
    );
    res.status(200).json(
        {
            message:"Emails send successfully"
        }
    )
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendemail