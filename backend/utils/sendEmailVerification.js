const nodemailer = require('nodemailer');
const twig = require('twig');
const path = require('path');

let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'transcendence-pong@outlook.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

async function renderHTML(template, data) {
  return new Promise((resolve, reject) => {
	twig.renderFile(path.join(__dirname, '../templates/mailVerif.twig'), data, (err, html) => {
	  if (err) {
		reject(err);
	  }
	  resolve(html);
	});
  });
}

async function sendEmail(to, refreshToken) {
  try {
	let subject = 'Matcha : Verify Your Email';
	let html = await renderHTML('email-verification', { url: 'http://localhost:8080/verifyEmail', token: refreshToken});
	console.log('sending email');
    let info = await transporter.sendMail({
      from: '"Matcha Email-Vérif" transcendence-pong@outlook.com',
      to: to,
      subject: subject,
      html: html
    });
	console.log('Message sent: %s', info.messageId);
  } catch (error) {
	console.error(error);
	throw new Error('Error sending email');
  }
}

module.exports = sendEmail;