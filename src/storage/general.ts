import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('general', () => {
	const username = ref<string>('');
	const token = ref<string>('');
	const isLoggedIn = () => token.value !== '';

	return {username, token, isLoggedIn }
})