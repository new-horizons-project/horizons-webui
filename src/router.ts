import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import User from './views/User.vue';
import Categories from './views/Categories.vue';
import CategoriesList from './views/CategoriesList.vue';
import Category from './views/Category.vue';
import CreateTopic from './views/CreateTopic.vue';
import { default as MainAdministrative } from './views/administrative/Main.vue';
import { default as AdminHome } from './views/administrative/Home.vue';
import ApplicationParameters from './views/administrative/ApplicationParameters.vue';
import UsersManagement from './views/administrative/UsersManagement.vue';
import TagsManagement from './views/administrative/TagsManagement.vue';
import CategoriesManagement from './views/administrative/CategoriesManagement.vue';
import EmptyTopics from './views/administrative/EmptyTopics.vue';
import JWTManagement from './views/administrative/JWTManagement.vue';
import ModerationLogs from './views/administrative/ModerationLogs.vue';
import SystemAudit from './views/administrative/SystemAudit.vue';
import Error from './views/Error.vue';

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
			},
			{
				path: ':id/new-topic',
				component: CreateTopic
			}
		]
	},
	{
		path: '/system',
		component: MainAdministrative,
		children: [
			{
				path: 'home',
				component: AdminHome
			},
			{
				path: 'application-parameters',
				component: ApplicationParameters
			},
			{
				path: 'users-management',
				component: UsersManagement
			},
			{
				path: 'tags-management',
				component: TagsManagement
			},
			{
				path: 'categories-management',
				component: CategoriesManagement
			},
			{
				path: 'empty-topics',
				component: EmptyTopics
			},
			{
				path: 'jwt',
				component: JWTManagement
			},
			{
				path: 'moderation-logs',
				component: ModerationLogs
			},
			{
				path: 'system-audit',
				component: SystemAudit
			}
		]
	},
	{
		path: '/e:id',
		component: Error
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/e404'
  	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;