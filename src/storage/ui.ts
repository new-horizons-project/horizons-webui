import { defineStore } from "pinia"
import { ref } from "vue"

export const useUiStore = defineStore('ui', () => {
	const displayLoginForm = ref<boolean>(false);
	const showLoadingBlocked = ref<boolean>(false);

	function showLoginForm () {
		displayLoginForm.value = true;
		showLoadingBlocked.value = true;
	}

	function hideLoginForm () {
		displayLoginForm.value = false;
		showLoadingBlocked.value = false;
	}

	return {displayLoginForm, showLoadingBlocked, showLoginForm, hideLoginForm}
});