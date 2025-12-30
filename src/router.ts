import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import PgNotFound from './views/errorPages/PgNotFound.vue';
import Api from './views/Api.vue';
import User from './views/User.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home 
	},
	{
		path: '/my',
		name: 'My Page',
		component: User
	},
	{
		path: '/api',
		name: 'API',
		component: Api
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: PgNotFound
  	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;