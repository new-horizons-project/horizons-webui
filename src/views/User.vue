<template>
	<div class="user-wrapper" v-if="authStore.user">
		<div class="user-card block-style">
			<div class="avatar">
				<img
					v-if="authStore.userAvatarUrl"
					:src="authStore.userAvatarUrl"
					alt="avatar"
				/>
				<div v-else class="user-avatar-alter">
					{{ authStore.user?.username[0]?.toUpperCase() }}
				</div>
			</div>

			<div class="user-info">
				<div class="username">
					{{ authStore.user?.username }}
				</div>

				<div class="info-block">
					<img src="/icons/role.png" class="icon">
					<p>Role:</p>

					<div class="role" :class="{
						administrator: authStore.user?.role === 'admin',
						moderator: authStore.user?.role === 'moderator',
						user: authStore.user?.role === 'user',
					}">
						{{ authStore.user?.rolePretty }}
					</div>
				</div>

				<div class="info-block">
					<img src="/icons/calendar.png" class="icon">
					<p>Registered:</p>
					<div class="text">{{ authStore.user?.registrationDate.toLocaleDateString() }}</div>
				</div>
			</div>

			<button class="button-style logout" @click="logoutBtn">Logout</button>
		</div>
	</div>
</template>

<script lang="ts" setup>

import { useAuthStore } from '../storage/auth';
import { logout } from '../api/user';
import router from '../router';
import { onMounted, watch } from 'vue';
import { useUiStore } from '../storage/ui';

const authStore = useAuthStore();
const uiStore = useUiStore();

async function logoutBtn () {
	authStore.setLogout();
	await logout();
	router.push('/');
};

onMounted(() => {
	if (!authStore.isLoggedIn) {
		uiStore.displayLoginForm = true;
	}
});

watch(() => uiStore.displayLoginForm, (newVal, oldVal) => {
	// If displayLoginForm form was True, changed to false, and user wasn't logged in
	// return to previous location
	if (oldVal && !newVal && !authStore.isLoggedIn) {
		router.back();
	}
});

</script>

<style lang="scss">
.user-wrapper {
	width: 100%;
	padding-top: 20px;
	display: flex;
	justify-content: center;
}

.user-card {
	width: 350px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	border-radius: 16px;
	backdrop-filter: blur(10px);

	.avatar {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.user-avatar-alter {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40px;
		font-weight: 600;
		user-select: none;
	}

	.user-info {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 10px;
		width: 100%;

		.username {
			margin-bottom: 5px;
			font-size: 20px;
			font-weight: 600;
		}

		.info-block {
			position: relative;
			padding: 10px;
			background-color: var(--background-color);
			border: 1px solid var(--border-color);
			border-radius: 10px;
			width: 80%;

			display: flex;
			align-items: center;
			gap: 10px;

			img {
				width: 25px;
			}

			p {
				margin: 0;
				padding: 0;
				font-size: 16px;
				font-weight: 600;
			}

			.text {
				position: absolute;
				right: 5px;
				font-weight: 600;
			}

			.role {
				right: 5px;
				position: absolute;
				padding: 3px 6px;
				border-radius: 50px;
				font-size: 12px;
				font-weight: 500;
				color: white;
				background: rgba(255, 255, 255, 0.08);

				&.administrator {
					background: linear-gradient(135deg, rgba(34, 197, 94, 0.9),rgba(21, 128, 61, 0.9));
				}

				&.moderator {
					background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
				}

				&.user {
					background: linear-gradient(135deg, rgba(107, 114, 128, 0.9), rgba(55, 65, 81, 0.9));
				}
			}
		}		
	}

	.logout {
		margin-top: 12px;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}
}
</style>
