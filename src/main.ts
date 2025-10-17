import { createApp } from 'vue';
import App from './App.vue';
import piniaPersisitedState from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPersisitedState);
app.use(pinia);
app.use(router);
app.mount('#app');
