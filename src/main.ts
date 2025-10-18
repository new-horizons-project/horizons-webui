import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import router from './router';
import App from './App.vue';

import en from "./locale/en.json";
import ua from "./locale/ua.json"

const pinia = createPinia();
const app = createApp(App);
const i18n = createI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en, ua }
});

app.use(pinia);
app.use(i18n);
app.use(router);
app.mount('#app');
