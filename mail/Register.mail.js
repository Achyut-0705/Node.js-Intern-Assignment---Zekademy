const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const registerMail = async (email) => {
  const mailDetails = {
    from: "Zekademy: Registration",
    to: email,
    subject: "Email confirmation for Zekademy",
    html: `
                    <h2>Confirm Email</h2>
                    <p>Thank you for being with us.</p>
                    <h5>Zekademy</h5>
                    <p>Dont't Share this mail or any kind of information associated with this mail</p>            
                    `,
  };

  try {
    await mailTransporter.sendMail(mailDetails);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = registerMail;
