<template>
	<div class="header-wrapper" :class="{ pinned: scrolled }">
		<div class="header block-style" :class="{ pinned: scrolled }">
			<div class="logo">
				<img :src="uiStore.imageUrl + '?size=thumbnail'" alt="NH">
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

				<router-link v-if="authStore.isLoggedIn" @mouseenter="onHover" @mouseleave="onUnhover" to="/my" class="user">
					<Dropdown class="dropdown-position" ref="dropdown">
						<div to="/my" class="username">
							<img v-if="authStore.userAvatarUrl" :src="authStore.userAvatarUrl" alt="">
							<div v-else class="user-avatar-alter">
								{{ authStore.user?.username[0]?.toUpperCase() }}
							</div>

							{{ authStore.user?.username }}
						</div>

						<hr>

						<div class="dropdown-buttons-block">
							<router-link class="button-style" to="/my">
								<img src="/icons/user.png" class="icon">
								Profile
							</router-link>

							<router-link class="button-style" to="/my/privacy">
								<img src="/icons/privacy.png" class="icon">
								Privacy and Security
							</router-link>

							<router-link class="button-style" to="/my/settings">
								<img src="/icons/gear.png" class="icon">
								Settings
							</router-link>
						</div>

						<hr>

						<div class="dropdown-buttons-block alter">
							v0.0.1
							<hr>
							<button class="button-style red" @click="logoutBtn()">Logout</button>
						</div>
					</Dropdown>

					<div class="user-block">
						<img v-if="authStore.userAvatarUrl" :src="authStore.userAvatarUrl" alt="">
						<div v-else class="user-avatar-alter">
							{{ authStore.user?.username[0]?.toUpperCase() }}
						</div>

						{{ authStore.user?.username }}
					</div>
				</router-link>
				<button v-else @click="showLoginForm" class="user" style="cursor: pointer;">
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
import { useRouter } from 'vue-router';
import { notificationController } from '../scripts/notificationController';
import Dropdown from './Dropdown.vue';
import { logout } from '../api/user';

const authStore = useAuthStore();
const uiStore = useUiStore();
const route = useRoute();
const dropdown = ref();
const router = useRouter();
let timer: number | undefined;

// Login
watch(() => uiStore.displayLoginForm, (isOpen) => {
	if (isOpen) {
		document.body.style.overflow = 'hidden';
		return;
	}

	document.body.style.overflow = 'initial';
});

// Forms
function showLoginForm() {
	uiStore.displayLoginForm = true;
}

function closeLoginForm() {
	uiStore.displayLoginForm = false;

	if (authStore.isLoggedIn)
		notificationController.createNotification(
			"Logged in!", 
			"Successfully logged in as " + authStore.user?.username, 
			authStore.userAvatarUrl, 
			"success"
		);
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

async function logoutBtn () {
	authStore.setLogout();
	await logout();
	router.push("/");
};

async function onHover() {
	if (timer) {
		window.clearTimeout(timer);
	}
	
	dropdown.value.changeVisibility(true);
}

function onUnhover() {
	timer = window.setTimeout(() => {
		dropdown.value.changeVisibility(false);
	}, 120);
}

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

.dropdown-position {
	position: absolute;
	top: calc(100% + 10px);
	right: 0;
	width: 250px;
}

.header {
	width: 90%;
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: 600;
	gap: 25px;
	padding: 5px;
	margin: 10px;
	user-select: none;
	transition: padding 400ms, border-radius 400ms;
	background-color: var(--background-color-main);

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
			color: var(--color);
			font-weight: 500;
		}
	}

	.indicator {
		position: absolute;
		bottom: 0;
		height: 3px;
		border-radius: 3px;
		background: var(--border-header-slider);
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
		position: relative;
		display: flex;
		align-items: center;
		gap: 10px;
		transition: background-color 400ms;
	}

	.user {
		color: var(--color);
		font-size: 14px;
		padding: 6px 10px;
		transition: color 200ms;

		.user-block {
			cursor: pointer;
			display: flex;
			gap: 10px;
			align-items: center;
		}

		img { 
			height: 35px;
			width: 35px;
			border-radius: 50%;
		}

		img.icon {
			height: 30px;
			width: 30px;
			border-radius: 0px;
			transition: filter 200ms;

			&:hover {
				filter: invert(var(--icon-hover-filter))
			}
		}

		.user-avatar-alter {
			padding: 4px 10px;
			font-weight: 500;
			font-size: 16px;
		}
	}

	.system-configuration {
		color: var(--color);
		padding: 11px 10px;

		img {
			height: 25px;
			filter: invert(var(--icon-filter));
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
	color: var(--color);
}

button {
	border: none;
	background-color: transparent;
}
</style>