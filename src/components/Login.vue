<template>
  <div class="subblur">
	<div class="form-background-block">
		<img src="http://127.0.0.1:8000/static/1?size=small" width="150" alt="">

		<div class="loading-screen" v-if="loadingScreen">
			<div class="loading-circle"></div>
			<div class="loading-text">{{ loadingText }}</div>
		</div>

		<div v-else class="login-form">
			<div class="image-block">
				<div class="text">
					New Horizons Project
				</div>
			</div>

			<div class="input-block" v-if="!userMustChangePassword">
				<input type="text" :class="{ error: usernameErr }" @focus="usernameErr = false"
					ref="usernameInput" v-model="username" placeholder="Username" />
				<input type="password" :class="{ error: passwordErr }" @focus="passwordErr = false"
					ref="passwordInput" v-model="password" placeholder="Password" />
			</div>

			<button @click="login">Login</button>
		</div>
	</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '../storage/general';
import { loginUser } from '../api/user';

const authStore = useAuthStore();

const loadingScreen = ref(false);
const userMustChangePassword = ref(false);
const username = ref<string>('')  
const password = ref<string>('')
const loadingText = ref<string>('Trying to log in...')

const usernameErr = ref<boolean>(false);
const passwordErr = ref<boolean>(false);
const usernameInput = ref<HTMLInputElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits(['close']);

const login = () => {
	let err = false;

	if (username.value === '') {
		err = true;
		usernameErr.value = true;
	}

	if (password.value === '') {
		err = true;
		passwordErr.value = true;
	}

	if (err) {
		return;
	}

	loadingScreen.value = true;

	loginUser(username.value, password.value).then((res) => {
		if (res.status === 200) {
			loadingText.value = 'Setting up credentials...';
			authStore.token = res.data.access_token;
			authStore.username = username.value;
			emit('close');
		}
	}).catch((err) => {
		if (err.status === 400 || err.status === 401 || err.status === 404) {
			loadingScreen.value = false;
			passwordErr.value = true;
			usernameErr.value = true;
		} else if (err.status === 403) {
			loadingText.value = 'You must change your password on first login.';
			userMustChangePassword.value = true;
		} else {
			loadingText.value = 'An error occurred. Please try again later.';
			console.error(err);
		}
	});
};

</script>

<style scoped>
.form-background-block {
	background-color: rgba(35, 35, 35, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.105);
	box-shadow: 0 1px 10px rgba(135, 135, 135, 0.1);
	border-radius: 5px;
	padding: 35px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	height: max-content;
	min-height: 400px;
	gap: 20px;
	opacity: 0;
	transform: translateY(30px);
	animation: appear 0.6s ease forwards;
	transition: height 0.3s, min-height 0.3s;
}

.login-form {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
}

.loading-screen {
	inset: 0;
	display: flex;
	flex-direction: column;
	gap: 50px;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 18px;
	margin-top: 50px;
}

.loading-circle {
	width: 50px;
	height: 50px;
	border: 5px solid rgba(255, 255, 255, 0.3);
	border-top-color: white;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

.loading-text {
	font-size: 24px;
	font-weight: 500;
}

.subblur {
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(5px);
	z-index: 1000;
}

.image-block {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	color: rgb(210, 210, 210);
}

.image-block img {
	width: 150px;
	height: auto;
	object-fit: contain;
	opacity: 0;
	transform: scale(0.95);
	animation: imageAppear 0.8s ease forwards 0.2s;
}

.text {
	font-size: 28px;
	font-weight: 600;
	opacity: 0;
	transform: translateY(10px);
	animation: fadeInUp 0.7s ease forwards 0.5s;
}

.input-block {
	width: 80%;
	display: flex;
	flex-direction: column;
	gap: 25px;
	margin-top: 10px;
}

.error {
	border-bottom-color: rgb(153, 52, 52) !important;
	animation: shake 0.3s ease;
}

@keyframes shake {
	0%, 100% {
		transform: translateX(0);
	}
	25% {
		transform: translateX(-5px);
	}
	50% {
		transform: translateX(5px);
	}
	75% {
		transform: translateX(-5px);
	}
}

input {
	background: transparent;
	border: none;
	border-bottom: 2px solid rgba(255, 255, 255, 0.3);
	padding: 10px;
	font-size: 16px;
	color: white;
	outline: none;
	transition: border-color 0.3s, transform 0.15s;
}

input:hover {
	border-bottom-color: rgba(255, 255, 255, 0.5);
}

input:focus {
	border-bottom-color: white;
	transform: scale(1.02);
}

input::placeholder {
	color: rgba(255, 255, 255, 0.5);
}

button {
	margin-top: 30px;
	padding: 8px 24px;
	background: transparent;
	border: 2px solid rgba(255, 255, 255, 0.3);
	border-radius: 5px;
	color: white;
	font-size: 16px;
	cursor: pointer;
	transition: border-color 0.2s, transform 0.15s, color 0.2s, background-color 0.2s;
}

button:hover {
	border-color: white;
	background-color: rgba(255, 255, 255, 0.109);
	transform: translateY(-2px);
}

button:active {
	transform: translateY(1px);
	color: rgb(200, 200, 200);
}

@keyframes appear {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeInUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes imageAppear {
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
