import { defineStore } from "pinia"
import { ref } from "vue"

export const useUiStore = defineStore('ui', () => {
	const displayLoginForm = ref<boolean>(false);
	const showLoading = ref<boolean>(false);
	const apiConnecitonChecked = ref<boolean>(false);

	return {
		displayLoginForm, 
		showLoading,
		apiConnecitonChecked,
	}
});