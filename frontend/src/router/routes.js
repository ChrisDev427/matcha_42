import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ForgotPassPage from '@/pages/ForgotPassPage.vue';

export const routes = [
    { path: '/', name:'HomePage', component: HomePage },
    { path: '/RegisterPage/', name: 'RegisterPage', component: RegisterPage },
    { path: '/LoginPage/', name: 'LoginPage', component: LoginPage },
    { path: '/ForgotPassPage/', name: 'ForgotPassPage', component: ForgotPassPage },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
