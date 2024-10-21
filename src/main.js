import { createApp } from 'vue'
import './assets/main.css'
import 'boxicons'
import axios from 'axios';

import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
axios.defaults.baseURL = 'http://localhost:3000';

// Automatically set the Authorization header for all Axios requests
const authStore = useAuthStore();
axios.interceptors.request.use((config) => {
  if (authStore.authToken) {
    config.headers.Authorization = `${authStore.authToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
app.mount('#app')
