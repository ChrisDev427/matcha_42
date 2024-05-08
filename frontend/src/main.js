import { createApp } from 'vue'
import App from './App.vue'

/* import font awesome icon component */
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "@flaticon/flaticon-uicons/css/all/all.css";

// Vue-Router -----------------------------------------------------------------------------------------
import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import ForgotPassPage from './pages/ForgotPassPage.vue';

const routes = [
    { path: '/', name:'HomePage', component: HomePage },
    { path: '/RegisterPage/', name: 'RegisterPage', component: RegisterPage },
    { path: '/LoginPage/', name: 'LoginPage', component: LoginPage },
    { path: '/ForgotPassPage/', name: 'ForgotPassPage', component: ForgotPassPage },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})



// i18n ------------------------------------------------------------------------------------------------
import { createI18n } from 'vue-i18n'

import {aboutProjectFooter_fr, aboutProjectFooter_en} from '../data/data.js'



const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      send: 'Send',
      userName: 'username',
      firstName: 'firstname',
      lastName: 'lastname',
      password: 'password',
      passwordConfirm: 'confirm password',
      accountCreate_btn: 'Create account',
      connect: 'Log in',
      registerTitle: 'create an account',
      registerSubTitle: 'and start swiping !',
      forgotPassword: 'Forgot password ?',
      resetPassword: 'reset password',
      resetPasswordInfo: 'Enter the email address you used when creating the account :',
      disconnect: 'Log out',
      contactUs: 'To Contact Us',
      projectMadeBy: 'a 42 school project created by :',
      aboutProjectFooter: aboutProjectFooter_en,
      // autres clés et traductions pour l'anglais
    },
    fr: {
      send: 'Envoyer',
      userName: 'nom d\'utilisateur',
      firstName: 'nom',
      lastName: 'prénom',
      password: 'mot de passe',
      passwordConfirm: 'confirmer le mot de passe',
      accountCreate_btn: 'Créer un compte',
      connect: 'Connexion',
      registerTitle: 'créer un compte',
      registerSubTitle: 'et commencer à swiper !',
      forgotPassword: 'Mot de passe oublié ?',
      resetPassword: 'reinitialiser le mot de passe',
      resetPasswordInfo: 'Saisissez l’adresse e‑mail que vous avez utilisé lors de la création du compte :',
      disconnect: 'Déonnexion',
      contactUs: 'Nous Contacter',
      projectMadeBy: "un projet de l'école 42 réalisé par :",
      aboutProjectFooter: aboutProjectFooter_fr,
      // autres clés et traductions pour le français
    }
    // ajoutez d'autres langues si nécessaire
  }
})



const VueApp = createApp(App);
VueApp.use(i18n);
VueApp.use(router);
VueApp.mount('#app');
