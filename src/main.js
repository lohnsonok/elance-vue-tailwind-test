import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Router from 'vue-router';
import geocoder from 'geocoder';
import App from './App.vue';
import '../css/tailwind.css';
import translations from './i18n';
import routes from './router';

Vue.config.productionTip = false;

Vue.use(VueI18n);

Vue.use(Router);

Vue.mixin({
  data() {
    return {
      geocoder,
    };
  },
});

// Create VueI18n instance with options
// eslint-disable-next-line no-unused-vars, new-cap
const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages: translations, // set locale messages
});

const router = new Router({
  mode: 'history',
  routes,
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
