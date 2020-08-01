import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../components/Store';
import ShoppingCart from '../components/ShoppingCart';
import Checkout from "../components/Checkout";
import OrderThanks from "../components/OrderThanks";


Vue.use(VueRouter);


const routes = [
  { path: "/", component: Store },
  { path: "/cart", component: ShoppingCart },
  { path: "/checkout", component: Checkout },
  { path: "/thanks/:id", component: OrderThanks },
  { path: "*", redirect: "/"}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
