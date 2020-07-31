import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../components/Store';
import ShoppingCart from '../components/ShoppingCart';


Vue.use(VueRouter);


const routes = [
  { path: "/", component: Store },
  { path: "/cart", component: ShoppingCart },
  { path: "*", redirect: "/"}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
