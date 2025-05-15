window.VITE_GOOGLE_OAUTH2_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// import Bootstrap 5
import './assets/all.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';

// import axios
import axios from 'axios';

// import vue-loading
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.config.globalProperties.$http = axios;
app.use(LoadingPlugin);
app.config.globalProperties.$gapi = {
  clientId: `${import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID}.apps.googleusercontent.com`,
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  prompt: 'select_account'
}

app.mount('#app');
