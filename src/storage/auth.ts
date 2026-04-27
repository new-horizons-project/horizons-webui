import { defineStore } from "pinia"
import { ref } from "vue"
import type { User } from "../api/user";

export const useAuthStore = defineStore('general', () => {
	const username = ref<string>('');
	const userAvatarUrl = ref<string | undefined>(undefined);
	const user = ref<User | undefined>(undefined);
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
		user.value = undefined;
		userAvatarUrl.value = undefined;
	}

	return {username, token, isLoggedIn, setLogin, setLogout, userAvatarUrl, user }
})