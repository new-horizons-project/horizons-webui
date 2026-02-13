import { defineStore } from "pinia"
import { ref } from "vue"
import { getImageUrl, getApplicationName } from "../api/app";

export const useUiStore = defineStore('ui', () => {
	const displayLoginForm = ref<boolean>(false);
	const showLoading = ref<boolean>(false);
	const apiConnecitonChecked = ref<boolean>(false);
	const imageUrl = ref<string>("");
	const titleBase = ref<string>("");
	const titleExtend = ref<string>("");
	const version = ref<string>("v0.0.1");

	const initImage = async (theme: string) => {
		imageUrl.value = await getImageUrl(theme);
	};

	const loadApplicationName = async () => {
		titleBase.value = await getApplicationName();
	}

	loadApplicationName();

	return {
		displayLoginForm, 
		showLoading,
		apiConnecitonChecked,
		imageUrl,
		titleBase,
		titleExtend,
		version,
		initImage
	}
});