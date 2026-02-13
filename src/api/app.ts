import { api } from "./axios";

export async function loadUser() {
	const res = await api.get('/user/');
	return res.data;
}

export async function ping() {
	const res = await api.get('/');
	return res;
}

export async function getImageUrl(theme: string) {
	const request: string = (theme == "dark")
		? '/ap/application.ui.logo_media_id?value_only=true'
		: '/ap/application.ui.logo_dark_media_id?value_only=true'
	
	const res = await api.get(request);
	return import.meta.env.VITE_NH_API_URL + "static/" + res.data;
}

export async function getApplicationName() {
	const res = await api.get('/ap/application.system.application_name?value_only=true');
	return res.data;
}