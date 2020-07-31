import Vue from 'vue';

import router from './router';
import store from './store';

import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";


Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
})
  .$mount('#app');
