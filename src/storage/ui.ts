import { defineStore } from "pinia"
import { ref } from "vue"
import { getImageUrl } from "../api/app";

export const useUiStore = defineStore('ui', () => {
	const displayLoginForm = ref<boolean>(false);
	const showLoading = ref<boolean>(false);
	const apiConnecitonChecked = ref<boolean>(false);
	const imageUrl = ref<string>("");

	const initImage = async () => {
		imageUrl.value = await getImageUrl();
	};

	initImage();

	return {
		displayLoginForm, 
		showLoading,
		apiConnecitonChecked,
		imageUrl
	}
});