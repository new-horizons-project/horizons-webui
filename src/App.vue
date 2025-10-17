<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './storage/general';
import Login from './components/Login.vue';
import Notification from './components/Notification.vue';

const authStore = useAuthStore();

const showLogin = ref(!authStore.isLoggedIn());
const showNotification = ref(false);

const closeLogin = () => {
	showLogin.value = false;
	showNotification.value = true;
};

const closeNotification = () => {
	showNotification.value = false;
}

</script>

<template>
	<div v-if="showLogin">
		<Login @close="closeLogin" />
	</div>
	<div v-if="showNotification">
		<Notification :header="`Welcome, ${ authStore.username }!`" src="http://127.0.0.1:8000/static/1?size=thumbnail"
			message="You have successfully logged in." type="success" @close="closeNotification"/>
	</div>

	<router-view />
</template>

<style scoped>
</style>
