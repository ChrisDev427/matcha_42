import { createApp } from 'vue'
import App from './App.vue'

/* import font awesome icon component */
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Vue-Router -----------------------------------------------------------------------------------------
import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';

const routes = [
    { path: '/', component: HomePage },
    // { path: '/RestaurantView/:name', name: 'RestaurantView', component: RestaurantView },
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
      accountCreate: 'Create account',
      connect: 'Log in',
      disconnect: 'Log out',
      contactUs: 'To Contact Us',
      projectMadeBy: 'a 42 school project created by :',
      aboutProjectFooter: aboutProjectFooter_en,
      // autres clés et traductions pour l'anglais
    },
    fr: {
      accountCreate: 'Créer un compte',
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



const VueApp = createApp(App);
VueApp.use(i18n);
VueApp.use(router);
VueApp.mount('#app');
