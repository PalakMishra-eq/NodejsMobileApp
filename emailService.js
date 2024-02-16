//sendEmail.js

// emailService.js
const nodemailer = require('nodemailer');



// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'palakmishra170101@gmail.com',
    pass: '@Ayu5678'
  }
});

// Function to send an email
async function sendEmail(recipient, subject, content) {
  try {
    // Define email options
    const mailOptions = {
      from: 'palakmishra170101@gmail.com',
      to: recipient ,
      subject: subject,
      text: content
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
