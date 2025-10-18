<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './storage/auth';
import { useUiStore } from './storage/ui';
import { reloadToken, loadUser } from './api/user';
import Login from './components/Login.vue';
import Loading from './components/Loading.vue';
import Notification from './components/Notification.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();

const reconnectMessageSubstr = ref<string>("");
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function loginAttempt() {
	for (let i = 0; i < 5; i++) {
		reconnectMessageSubstr.value = `Attempt: ${i + 1} of 5`;
		console.log(`Attempt ${i + 1}`);

		try {
			const res = await reloadToken();
			if (res.status === 200) {
				authStore.token = res.data.access_token;
				const user = await loadUser();
				authStore.setLogin(user.username);
				break;
			}
		} catch (err: any) {
			if (err.status === 401) {
				uiStore.showLoginForm();
				break;
			}

			console.log(err);
			await sleep(5000);
		}
	}

	reconnectMessageSubstr.value = "Reload the page to retry connection";
}

if (!authStore.isLoggedIn) {
	(async () => {
		await loginAttempt();
	})();
}


const showNotification = ref(false);

const closeLogin = () => {
	uiStore.hideLoginForm();
	showNotification.value = true;
};

const closeNotification = () => {
	showNotification.value = false;
}

</script>

<template>
	<div v-if="uiStore.displayLoginForm">
		<Login @close="closeLogin" />
	</div>
	<div v-if="showNotification">
		<Notification :header="`Welcome, ${ authStore.username }!`" src="http://127.0.0.1:8000/static/1?size=thumbnail"
			message="You have successfully logged in." type="success" @close="closeNotification"/>
	</div>

	<router-view v-if="authStore.isLoggedIn"/>
	<Loading v-else-if="!uiStore.showLoadingBlocked" :substr="reconnectMessageSubstr" />
</template>

<style scoped>

</style>
