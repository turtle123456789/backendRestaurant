const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "vuthuylinh23082002@gmail.com",
    pass: "dnas vhno yvup yrdg",
  },
});

module.exports = transporter;
