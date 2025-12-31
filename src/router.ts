import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import PgNotFound from './views/errorPages/PgNotFound.vue';
import User from './views/User.vue';
import Categories from './views/Categories.vue';
import CategoriesList from './views/CategoriesList.vue';
import Category from './views/Category.vue';

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
		path: '/categories',
		name: 'Categories',
		component: Categories,
		children: [
			{
				path: '',
				component: CategoriesList
			},
			{
				path: ':id',
				component: Category
			}
		]
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