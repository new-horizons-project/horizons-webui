<template>
	<div class="header-wrapper" :class="{ pinned: scrolled }">
		<div class="header" :class="{ pinned: scrolled }">
			<div class="logo">
				<img :src="uiStore.imageUrl" alt="NH">
			</div>

			<nav class="links" ref="nav">
				<router-link
					v-for="link in links"
					:key="link.to"
					:to="link.to"
					class="link"
					ref="items"
				>
					{{ link.label }}
				</router-link>

				<div class="indicator" :style="indicatorStyle"></div>
			</nav>

			<div class="buttons-block">
				<router-link class="system-configuration" to="/system">
					<img src="/icons/gear.png" alt="">
				</router-link>

				<router-link v-if="authStore.isLoggedIn" class="user" to="/my">
					<img v-if="authStore.userAvatarUrl" :src="authStore.userAvatarUrl" alt="">
					<div v-else class="user-avatar-alter">
						{{ authStore.username[0]?.toUpperCase() }}
					</div>

					{{ authStore.username }}
				</router-link>
				<button v-else @click="showLoginForm" class="user">
					<img src="/icons/login.png" class="icon">
				</button>
			</div>
		</div>
	</div>
	<Login v-if="uiStore.displayLoginForm" @close="closeLoginForm"/>
</template>

<script setup lang="ts">

import { 
	ref, 
	onMounted,
	nextTick,
	onUnmounted,
	computed,
	watch 
} from 'vue';
import { useUiStore } from '../storage/ui';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../storage/auth';
import Login from './Login.vue';

import { notificationController } from '../scripts/notificationController';

const authStore = useAuthStore();
const uiStore = useUiStore();
const route = useRoute();

// Login
watch(() => uiStore.displayLoginForm, (isOpen) => {
	if (isOpen) {
		document.body.style.overflow = 'hidden';
		return;
	}

	document.body.style.overflow = 'initial';
});

function showLoginForm() {
	uiStore.displayLoginForm = true;
}

function closeLoginForm() {
	uiStore.displayLoginForm = false;
	notificationController.createNotification("Logged in!", "Successfully logged in as " + authStore.username, 
											  authStore.userAvatarUrl, "success")
}

// Nav slider
const links = [
	{
		label: 'Home',
		to: '/'
	},
	{
		label: 'Latest',
		to: '/latest'
	},
	{
		label: 'Categories',
		to: '/categories'
	}
]

const nav = ref<HTMLElement | null>(null)
const items = ref<HTMLElement[]>([])

const indicator = ref({ left: 0, width: 0 })

const updateIndicator = async () => {
	await nextTick();

	const index = links.findIndex(l => l.to === route.path);
	const element = items.value[index];
	const parent = nav.value;

	if (!element || !parent) return;

	const element_rect = element.getBoundingClientRect();
	const parent_rect = parent.getBoundingClientRect();

	indicator.value = {
		left: element_rect.left - parent_rect.left,
		width: element_rect.width
	};
};

const indicatorStyle = computed(() => {
	const index = links.findIndex(l => l.to === route.path)

	if (index == -1) return { opacity: 0 } 

	return {
		transform: `translateX(${indicator.value.left}px)`,
		width: `${indicator.value.width}px`,
		opacity: 1
	}
})

watch(() => route.path, updateIndicator);

// Scroll event
const scrolled = ref<boolean>(false);

const onScroll = () => {
	scrolled.value = window.scrollY > 10
};

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true });
	updateIndicator();

	if (nav.value) {
		items.value = Array.from(nav.value.querySelectorAll('.link')) as HTMLElement[]
	}

	updateIndicator()
});

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
});

</script>

<style lang="scss" scoped>
.header-wrapper {
	width: 100%;
	height: min-content;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;

	&.pinned {
		position: fixed;
		top: 0;
	}
}

.header {
	width: 75%;
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: 600;
	gap: 25px;
	padding: 5px;
	margin: 10px;
	border-radius: 15px;
	backdrop-filter: blur(12px);
	background-color: rgba(35, 35, 35, 0.35);
	border: 1px solid rgba(255, 255, 255, 0.15);
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	user-select: none;
	transition: padding 400ms, border-radius 400ms;

	&.compact {
		cursor: pointer;
		margin: 5px;
		width: max-content;
		max-width: 400px;
		padding: 2px 10px;
		font-size: 14px;
	}

	* {
		transition: padding 400ms, border-radius 400ms;
	}

	img {
		transition: height 400ms;
	}

	.logo {
		padding: 3px 10px;
		min-height: 40px;
		transform: translateY(2px);

		img {
			height: 35px; 
		}
	}

	&.pinned > .logo {
		padding: 1px 8px 2px;
		min-height: 35px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;

		img { 
			height: 30px; 
		}
	}

	.links {
		position: relative;
		display: flex;
		align-items: center;
		gap: 25px;

		.link {
			position: relative;
			padding: 6px 2px;
			text-decoration: none;
			color: white;
			font-weight: 500;
		}
	}

	.indicator {
		position: absolute;
		bottom: 0;
		height: 3px;
		border-radius: 3px;
		background: white;
		transition: transform 400ms cubic-bezier(.34,1.26,.64,1),
					width 300ms ease,
					opacity 300ms ease;
	}

	.buttons-block {
		right: 5px;
		position: absolute;
		display: flex;
		gap: 5px;
	}

	.user, .system-configuration {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 10px;
		transition: background-color 400ms;

		&:active {
			transform: translateY(1px);
		}
	}

	.user {
		padding: 6px 10px;
		transition: color 200ms;

		img { 
			height: 35px;
			border-radius: 50%;
		}

		img.icon {
			height: 30px;
			border-radius: 0px;
			transition: filter 200ms;

			&:hover {
				filter: invert(var(--icon-hover-filter))
			}
		}

		.user-avatar-alter {
			border: 1px solid transparent;
			border-radius: 50%;
			background-color: rgb(52, 52, 52);
			padding: 3px 10px;
		}

		&:hover {
			color: rgb(205, 205, 205);
		}
	}

	.system-configuration {
		color: rgb(220, 220, 220);
		padding: 11px 10px;

		img {
			height: 25px;
			filter: invert(1);
			transform-origin: center center;
			transition: transform 400ms ease, height 400ms;
		}

		&:hover > img { 
			transform: rotate(90deg); 
		}
	}

	&.pinned {
		padding: 0 0 5px 5px;
		margin: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-top: none;

		.logo {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			border-top-color: transparent;
		}

		.buttons-block {
			.user, .system-configuration {
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				border-top-color: transparent;
			}

			.system-configuration { 
				padding: 7px 10px; 
			}

			.user { 
				padding: 5px 10px; 
				
				img { 
					height: 25px; 
				} 
			
			}
		}
	}

	.hidden {
		opacity: 0;
		width: 0;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
}

a {
	text-decoration: none;
	color: white;
}

button {
	border: none;
	background-color: transparent;
}
</style>