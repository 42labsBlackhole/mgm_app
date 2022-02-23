import { createApp } from "vue";
import VueCookies from 'vue3-cookies';
import VueSplide from '@splidejs/vue-splide';
import Maska from 'maska';
import App from "./App.vue";
import router from "./router";
import './style/global.css';

createApp(App).use(router).use(VueCookies).use(VueSplide).use(Maska).mount("#app");
