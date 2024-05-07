const nodemailer = require('nodemailer');

// Créer un transporteur reutilisable en utilisant les paramètres par défaut de SMTP
let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', // Remplacez par votre serveur SMTP
  port: 587,
  secure: false, // true pour le port 465, false pour les autres ports
  auth: {
    user: 'transcendence-pong@outlook.com', // Votre adresse e-mail
    pass: 'gzdqyrdxdmjbtdti' // Votre mot de passe
  }
});

// Fonction d'envoi d'email
async function sendEmail(to, subject, text) {
  try {
	console.log('sending email');
    let info = await transporter.sendMail({
      from: '"Matcha Email-Vérif" transcendence-pong@outlook.com', // adresse de l'expéditeur
      to: to, // liste des destinataires
      subject: subject, // Sujet du message
      text: text, // corps du message en texte brut
      // html: "<b>Hello world?</b>" // corps du message en HTML
    });
	console.log('Message sent: %s', info.messageId);
  } catch (error) {
	console.error(error);
  }
}

module.exports = sendEmail;
