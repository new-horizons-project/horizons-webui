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

if (!authStore.isLoggedIn) {
	reloadToken().then(res => {
		if (res.status === 200) {
			authStore.token = res.data.access_token;
			return loadUser();
		}
	}).then((user) => {
		authStore.setLogin(user.username);
	}).catch((err) => {
		if (err.status === 401) {
			uiStore.showLoginForm()
			return;
		}
		// Display critical error
		console.log(err);
	});
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
	<Loading v-else-if="!uiStore.showLoadingBlocked"/>
</template>

<style scoped>

</style>
