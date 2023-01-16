import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Router from 'vue-router';
import geocoder from 'geocoder';
// import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import '../css/tailwind.css';
import translations from './i18n';
import routes from './router';

Vue.config.productionTip = false;

Vue.use(VueI18n);

Vue.use(Router);

// gmaps
/* Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
    libraries: 'geometry,drawing,places',
  },
}); */

/* const gmapApiPromiseLazy = new Promise((resolve, reject) => {
  Vue.$gmapApiPromiseLazyCb = () => {
    resolve(Vue.$gmapApiPromiseLazy);
    reject(new Error('Google Maps API is not loaded'));
  };
}); */

Vue.mixin({
  data() {
    return {
      geocoder,
    };
  },
  /* created() {
    this.$gmapApiPromiseLazy = gmapApiPromiseLazy;
  }, */
});

// Vue.$gmapApiPromiseLazy = gmapApiPromiseLazy;

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
