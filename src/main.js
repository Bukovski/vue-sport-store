import Vue from 'vue';
import Vuelidate from "vuelidate";

import router from './router';
import store from './store';

import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";


Vue.config.productionTip = false;

Vue.filter("currency", (value) =>  new Intl.NumberFormat("en-US",
  { style: "currency", currency: "USD" }).format(value));

Vue.use(Vuelidate);

new Vue({
  store,
  router,
  render: h => h(App)
})
  .$mount('#app');
