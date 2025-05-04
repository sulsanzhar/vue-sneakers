import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Wishlist from '../views/WishList.vue';
import OrderList from '../views/OrderList.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/orders', component: OrderList },
	{ path: '/wishlist', component: Wishlist },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
