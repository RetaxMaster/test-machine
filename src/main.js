import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/styles/main.css";
import store from './store'
import router from './router'

createApp(App).use(router).use(store).mount('#app')

// TODO: No quitar el contador cuando termine el examen
// TODO: Feedback de correcto o incorrecto al instante