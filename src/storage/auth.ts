import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('general', () => {
	const username = ref<string>('');
	const token = ref<string>('');
	const isLoggedIn = ref<boolean>(false);

	const setLogin = (inc_username: string) => {
		username.value = inc_username;
		isLoggedIn.value = true;
	}

	const setLogout = () => {
		username.value = '';
		isLoggedIn.value = false;
		token.value = '';
	}

	return {username, token, isLoggedIn, setLogin, setLogout }
})