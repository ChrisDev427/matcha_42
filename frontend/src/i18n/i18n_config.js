import { createI18n } from 'vue-i18n'

import {
	aboutProjectFooter_en, 
    aboutProjectFooter_fr, 
    accountCreatedText_en,
    accountCreatedText_fr, 
		registrationErrorText_fr, 
		registrationErrorText_en,
		registrationErrorUsernameText_en,
		registrationErrorUsernameText_fr,
		registrationErrorEmailText_en,
		registrationErrorEmailText_fr,
		loginSuccessText_en,
		loginSuccessText_fr,
		loginFailText_en,
		loginFailText_fr,
} from '@/data/data.js'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
			hello: 'Hello',
      send: 'Send',
      userName: 'username',
      firstName: 'firstname',
      lastName: 'lastname',
      password: 'password',
      passwordConfirm: 'confirm password',
      accountCreate_btn: 'Create account',
      
      registerTitle: 'create an account',
      registerSubTitle: 'and start swiping !',

      accountCreatedTitle: 'account created',
      accountCreatedText: accountCreatedText_en,

      errorTitle: 'Oups !',
			serverErrorText: registrationErrorText_en,

			registrationErrorUsernameText: registrationErrorUsernameText_en,

			registrationErrorEmailText: registrationErrorEmailText_en,

			loginSuccessText: loginSuccessText_en,

			loginFailText: loginFailText_en,
      wrongPasswordText: 'Wrong Password !',
      emailNotVerifiedText: 'Please verify your email address to log in.',

     
      reSendEmail: 'Resend email',
      reSendEmail_emailSent: 'Email sent',
      reSendEmail_userNotMatch: 'User not match !',
      reSendEmail_alreadyVerified: 'E-mail already verified !',
      reSendEmail_serverError: 'Server error, try again later...',

      forgotPassword: 'Forgot password ?',
      resetPassword: 'reset password',
      resetPasswordInfo: 'Enter the email address you used when creating the account :',
      connect: 'Connect',
      disconnect: 'Log out',
      contactUs: 'To Contact Us',
      projectMadeBy: 'a 42 school project created by :',
      aboutProjectFooter: aboutProjectFooter_en,
      // autres clés et traductions pour l'anglais
    },
    fr: {
			hello: 'Bonjour',
      send: 'Envoyer',
      userName: 'nom d\'utilisateur',
      firstName: 'nom',
      lastName: 'prénom',
      password: 'mot de passe',
      passwordConfirm: 'confirmer le mot de passe',
      accountCreate_btn: 'Créer un compte',

      registerTitle: 'créer un compte',
      registerSubTitle: 'et commencer à swiper !',

      accountCreatedTitle: 'compte crée',
      accountCreatedText: accountCreatedText_fr,

      errorTitle: 'Oups !',
			serverErrorText: registrationErrorText_fr,

			registrationErrorUsernameText: registrationErrorUsernameText_fr,

			registrationErrorEmailText: registrationErrorEmailText_fr,

			loginSuccessText: loginSuccessText_fr,

			loginFailText: loginFailText_fr,
      wrongPasswordText: 'Mot de passe incorrect !',
      emailNotVerifiedText: 'Merci de vérifier votre adresse e-mail pour vous connecter.',

      
      reSendEmail: 'Renvoyer le mail',
      reSendEmail_emailSent: 'E-mail envoyé',
      reSendEmail_userNotMatch: 'Utilisateur non trouvé !',
      reSendEmail_alreadyVerified: 'E-mail déjà verifié !',
      reSendEmail_serverError: 'Erreur serveur, veuillez réessayer plus tard...',
      

      forgotPassword: 'Mot de passe oublié ?',
      resetPassword: 'reinitialiser le mot de passe',
      resetPasswordInfo: 'Saisissez l’adresse e‑mail que vous avez utilisé lors de la création du compte :',
      connect: 'Connexion',
      disconnect: 'Déonnexion',
      contactUs: 'Nous Contacter',
      projectMadeBy: "un projet de l'école 42 réalisé par :",
      aboutProjectFooter: aboutProjectFooter_fr,
      // autres clés et traductions pour le français
    }
    // ajoutez d'autres langues si nécessaire
  }
})